import { Condition, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  PutCommandOutput,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  marshall,
  NativeAttributeValue,
  unmarshall,
} from '@aws-sdk/util-dynamodb';
import { logger } from '../../logger';
import { DynamoDBEntity } from './dynamodb.entity';

/**
 * Manages interactions with DynamoDB for storing and retrieving objects.
 */
export class DynamodbManager {
  private static _instance: DynamodbManager;

  private readonly objectTable: string;
  private readonly client: DynamoDBClient;
  private readonly documentClient: DynamoDBDocumentClient;

  private constructor() {
    const isTest = process.env['JEST_WORKER_ID'];
    let configOverride = {};
    if (isTest) {
      configOverride = {
        endpoint: 'http://localhost:8001',
        sslEnabled: false,
        region: 'local-env',
        accessKeyId: 'fakeAccessKeyId',
        secretAccessKey: 'fakeSecretAccessKey',
      };
      process.env['OBJECT_TABLE'] = 'local-object-table';
    }

    this.objectTable = process.env['OBJECT_TABLE']!;
    this.client = new DynamoDBClient({
      region: process.env['AWS_REGION'],
      ...configOverride,
    });
    this.documentClient = DynamoDBDocumentClient.from(this.client);

    logger.debug('DynamodbManager initialized', {
      objectTable: this.objectTable,
      client: this.client,
      documentClient: this.documentClient,
    });
  }

  /**
   * Get object from DynamoDB.
   * @param obj object
   * @param options get options
   */
  public async get<T>(
    obj: {
      hashKey: string;
      rangeKey: string;
    },
    options?: {
      consistentRead?: boolean;
    }
  ): Promise<T | null> {
    logger.info('in', { class: 'DynamodbManager', method: 'get' });
    const command = new GetCommand({
      TableName: this.objectTable,
      Key: {
        hashKey: obj.hashKey,
        rangeKey: obj.rangeKey,
      },
      ConsistentRead: options?.consistentRead ?? false,
    });
    logger.debug('command', { command });
    const response: GetCommandOutput = await this.documentClient.send(command);
    logger.debug('response', { response });
    logger.info('out', { class: 'DynamodbManager', method: 'get' });
    return response.Item ? (response.Item as T) : null;
  }

  /**
   * Query objects from DynamoDB.
   * @param obj condition object
   * @param options query options
   */
  public async query<T>(
    obj: { hashKey: string },
    options?: {
      exclusiveStartKeyStr?: string;
      rangeKeyCondition?: Omit<Condition, 'AttributeValueList'> & {
        AttributeValueList?: NativeAttributeValue[];
      };
      scanIndexForward?: boolean;
    }
  ): Promise<[T[], string | undefined]> {
    logger.info('in', { class: 'DynamodbManager', method: 'query' });

    let exclusiveStartKey: Record<string, NativeAttributeValue> | undefined;
    if (options?.exclusiveStartKeyStr) {
      exclusiveStartKey = JSON.parse(options.exclusiveStartKeyStr);
    }
    const command: QueryCommand = new QueryCommand({
      TableName: this.objectTable,
      KeyConditions: {
        hashKey: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [obj.hashKey],
        },
        ...(options?.rangeKeyCondition
          ? {
              rangeKey: options?.rangeKeyCondition,
            }
          : {}),
      },
      ExclusiveStartKey: exclusiveStartKey,
      ScanIndexForward:
        typeof options?.scanIndexForward !== 'undefined'
          ? options.scanIndexForward
          : true,
    });
    logger.debug('command', { command });

    const response = await this.documentClient.send(command);

    logger.info('out', { class: 'DynamodbManager', method: 'query' });
    return [
      response.Items?.map((item) => item as T) ?? [],
      response.LastEvaluatedKey
        ? JSON.stringify(response.LastEvaluatedKey)
        : undefined,
    ];
  }

  public async queryAll<T>(
    obj: { hashKey: string },
    options?: {
      exclusiveStartKeyStr?: string;
      rangeKeyCondition?: Omit<Condition, 'AttributeValueList'> & {
        AttributeValueList?: NativeAttributeValue[];
      };
      scanIndexForward?: boolean;
    }
  ): Promise<T[]> {
    logger.info('in', { class: 'DynamodbManager', method: 'queryAll' });

    const items: T[] = [];
    let nextToken: string | undefined;
    do {
      const [result, newNextToken] = await this.query<T>(obj, {
        exclusiveStartKeyStr: nextToken,
        rangeKeyCondition: options?.rangeKeyCondition,
        scanIndexForward: options?.scanIndexForward,
      });
      items.push(...result);
      nextToken = newNextToken;
    } while (typeof nextToken !== 'undefined');

    logger.info('out', { class: 'DynamodbManager', method: 'queryAll' });
    return items;
  }

  /**
   * Put object to DynamoDB.
   * @param obj object
   */
  public async put<T extends DynamoDBEntity>(
    obj: T
  ): Promise<PutCommandOutput> {
    logger.info('in', { class: 'DynamodbManager', method: 'put' });

    const command = new PutCommand({
      TableName: this.objectTable,
      Item: obj,
    });
    logger.debug('command', { command });

    const response: PutCommandOutput = await this.documentClient.send(command);
    logger.debug('response', { response });

    logger.info('out', { class: 'DynamodbManager', method: 'put' });
    return response;
  }

  /**
   * Put objects to DynamoDB.
   * @param objs objects
   */
  public async putAll<T extends DynamoDBEntity>(objs: T[]): Promise<void> {
    logger.info('in', { class: 'DynamodbManager', method: 'putAll' });

    const requestItems = [...Array(Math.ceil(objs.length / 25)).keys()].map(
      (part) => {
        return {
          [this.objectTable]: objs
            .slice(part * 25, (part + 1) * 25)
            .map((obj) => ({
              PutRequest: {
                Item: obj,
              },
            })),
        };
      }
    );

    await Promise.all(
      requestItems.map(async (requestItem) => {
        const command = new BatchWriteCommand({
          RequestItems: requestItem,
        });
        logger.debug('command', { command });
        await this.documentClient.send(command);
      })
    );

    logger.info('out', { class: 'DynamodbManager', method: 'putAll' });
  }

  /**
   * Delete object from DynamoDB.
   * @param objs objects
   */
  public async deleteAll<T extends DynamoDBEntity>(objs: T[]): Promise<void> {
    logger.info('in', { class: 'DynamodbManager', method: 'deleteAll' });

    const requestItems = [...Array(Math.ceil(objs.length / 25)).keys()].map(
      (part) => {
        return {
          [this.objectTable]: objs
            .slice(part * 25, (part + 1) * 25)
            .map((obj) => ({
              DeleteRequest: {
                Key: {
                  hashKey: obj.hashKey,
                  rangeKey: obj.rangeKey,
                },
              },
            })),
        };
      }
    );

    await Promise.all(
      requestItems.map(async (requestItem) => {
        const command = new BatchWriteCommand({
          RequestItems: requestItem,
        });
        logger.debug('command', { command });
        await this.documentClient.send(command);
      })
    );

    logger.info('out', { class: 'DynamodbManager', method: 'deleteAll' });
  }

  public static createHashKey(
    object: string,
    ...keyValues: [string, string][]
  ): string {
    return `object="${object}";${keyValues
      .map(([key, value]) => `${key}="${value}";`)
      .join('')}`;
  }

  public static createRangeKey(...keyValues: [string, string][]): string {
    if (keyValues.length === 0) {
      return ' ';
    }
    return keyValues.map(([key, value]) => `${key}="${value}";`).join('');
  }

  /**
   * Generate TTL.
   * @param seconds record expires in seconds
   */
  public static getTTL(seconds: number): number {
    return Math.floor(new Date().getTime() / 1000) + seconds;
  }

  private static marshall<T extends DynamoDBEntity>(
    obj: T
  ): Record<string, NativeAttributeValue> {
    return marshall<T>(obj, {
      removeUndefinedValues: true,
    });
  }

  private static unmarshall<T>(
    record?: Record<string, NativeAttributeValue>
  ): T | null {
    if (typeof record === 'undefined') {
      return null;
    }
    return unmarshall(record) as T;
  }

  public static getInstance(): DynamodbManager {
    if (!this._instance) {
      this._instance = new DynamodbManager();
    }
    return this._instance;
  }
}
