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
import { DynamodbEntity } from './entity/dynamodb.entity';
import {
  marshall,
  NativeAttributeValue,
  unmarshall,
} from '@aws-sdk/util-dynamodb';
import { logger } from '../../logger';

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
   */
  public async get<T extends DynamodbEntity>(obj: T): Promise<T | null> {
    logger.info('in', { class: 'DynamodbManager', method: 'get' });
    const command = new GetCommand({
      TableName: this.objectTable,
      Key: {
        hashKey: obj.hashKey,
        rangeKey: obj.rangeKey,
      },
    });
    logger.debug('command', { command });
    const response: GetCommandOutput = await this.documentClient.send(command);
    logger.info('out', { class: 'DynamodbManager', method: 'get' });
    return DynamodbManager.unmarshall<T>(response.Item);
  }

  /**
   * Query objects from DynamoDB.
   * @param obj condition object
   * @param options query options
   */
  public async query<T extends DynamodbEntity>(
    obj: T,
    options?: {
      exclusiveStartKeyStr?: string;
      rangeKeyCondition?: Omit<Condition, 'AttributeValueList'> & {
        AttributeValueList?: NativeAttributeValue[];
      };
      scanIndexForward?: boolean;
    }
  ): Promise<[T[], string]> {
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
      response.Items?.map((item) => DynamodbManager.unmarshall<T>(item)!) ?? [],
      JSON.stringify(response.LastEvaluatedKey),
    ];
  }

  /**
   * Put object to DynamoDB.
   * @param obj object
   */
  public async put<T extends DynamodbEntity>(obj: T): Promise<T> {
    logger.info('in', { class: 'DynamodbManager', method: 'put' });

    const command = new PutCommand({
      TableName: this.objectTable,
      Item: DynamodbManager.marshall(obj),
    });
    logger.debug('command', { command });

    const response: PutCommandOutput = await this.documentClient.send(command);
    const entity = DynamodbManager.unmarshall<T>(response.Attributes);
    if (!entity) {
      throw new Error('Failed to put');
    }

    logger.info('out', { class: 'DynamodbManager', method: 'put' });
    return entity;
  }

  /**
   * Put objects to DynamoDB.
   * @param objs objects
   */
  public async putAll<T extends DynamodbEntity>(objs: T[]): Promise<void> {
    logger.info('in', { class: 'DynamodbManager', method: 'putAll' });

    const requestItems = [
      ...Array(Math.floor(objs.length / 25) + 1).keys(),
    ].map((part) => {
      return {
        [this.objectTable]: objs
          .slice(part * 25, (part + 1) * 25)
          .map((obj) => ({
            PutRequest: {
              Item: DynamodbManager.marshall(obj),
            },
          })),
      };
    });

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

  private static marshall<T extends DynamodbEntity>(
    obj: T
  ): Record<string, NativeAttributeValue> {
    return marshall<T>(
      {
        ...obj,
        hashKey: obj.hashKey,
        rangeKey: obj.rangeKey,
        ttl: obj.ttl,
      },
      {
        convertClassInstanceToMap: true,
        removeUndefinedValues: true,
      }
    );
  }

  private static unmarshall<T extends DynamodbEntity>(
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
