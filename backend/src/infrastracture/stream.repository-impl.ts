import { StreamRepository } from '../domain/repository/stream.repository';
import { Stream } from '../domain/model/stream';
import { injectable } from 'inversify';
import { StreamDynamodbEntity } from './dynamodb/entity/stream.dynamodb.entity';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import 'reflect-metadata';
import { logger } from '../logger';

@injectable()
export class StreamRepositoryImpl implements StreamRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
  }

  async findAllByBroadcasterId(
    broadcasterId: string,
    nextToken?: string
  ): Promise<{ items: Stream[]; nextToken?: string }> {
    const [items, newNextToken] = await this.manager.query(
      new StreamDynamodbEntity({ broadcasterId }),
      {
        exclusiveStartKeyStr: nextToken,
        scanIndexForward: false,
      }
    );
    return {
      items,
      nextToken: newNextToken,
    };
  }

  async save(stream: Stream): Promise<Stream> {
    logger.info('in', { class: 'StreamRepositoryImpl', method: 'save' });
    const response = await this.manager.put(new StreamDynamodbEntity(stream));
    logger.info('out', { class: 'StreamRepositoryImpl', method: 'save' });
    return response;
  }
}
