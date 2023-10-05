import {
  DynamoDBClient,
  WriteRequest,
  PutRequest,
  DeleteRequest,
  Condition,
} from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  BatchWriteCommandOutput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  PutCommandOutput,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamodbEntity } from './entity/dynamodb.entity';
import {
  NativeAttributeValue,
  marshall,
  unmarshall,
} from '@aws-sdk/util-dynamodb';
import { logger } from '../../logger';

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

  public async get<T extends DynamodbEntity>(obj: T): Promise<T | null> {
    const command = new GetCommand({
      TableName: this.objectTable,
      Key: {
        hashKey: obj.hashKey,
        rangeKey: obj.rangeKey,
      },
    });
    const response: GetCommandOutput = await this.documentClient.send(command);
    return DynamodbManager.unmarshall<T>(response.Item);
  }

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
    const response = await this.documentClient.send(command);
    return [
      response.Items?.map((item) => DynamodbManager.unmarshall<T>(item)!) ?? [],
      JSON.stringify(response.LastEvaluatedKey),
    ];
  }

  public async put<T extends DynamodbEntity>(obj: T): Promise<T> {
    const command = new PutCommand({
      TableName: this.objectTable,
      Item: { ...obj },
    });

    const response: PutCommandOutput = await this.documentClient.send(command);
    const entity = DynamodbManager.unmarshall<T>(response.Attributes);
    if (!entity) {
      throw new Error('Failed to put');
    }
    return entity;
  }

  public async putAll<T extends DynamodbEntity>(objs: T[]): Promise<void> {
    let unprocessedItems: Record<
      string,
      (Omit<WriteRequest, 'PutRequest' | 'DeleteRequest'> & {
        PutRequest?: Omit<PutRequest, 'Item'> & {
          Item: Record<string, NativeAttributeValue> | undefined;
        };
        DeleteRequest?: Omit<DeleteRequest, 'Key'> & {
          Key: Record<string, NativeAttributeValue> | undefined;
        };
      })[]
    > = {
      [this.objectTable]: objs.map((obj) => ({
        PutRequest: {
          Item: DynamodbManager.marshall(obj),
        },
      })),
    };

    do {
      const command = new BatchWriteCommand({
        RequestItems: unprocessedItems,
      });
      const response: BatchWriteCommandOutput =
        await this.documentClient.send(command);
      unprocessedItems = response.UnprocessedItems ?? {};
    } while (Object.keys(unprocessedItems).length > 0);
  }

  private static marshall<T extends DynamodbEntity>(
    obj: T
  ): Record<string, NativeAttributeValue> {
    return marshall<T>(obj, {
      convertClassInstanceToMap: true,
    });
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
