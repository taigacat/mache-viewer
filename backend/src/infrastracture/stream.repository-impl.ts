import { StreamRepository } from '../domain/repository/stream.repository';
import { Stream } from '../domain/model/stream';
import { injectable } from 'inversify';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import 'reflect-metadata';
import { logger } from '../logger';

@injectable()
export class StreamRepositoryImpl implements StreamRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
  }

  async findById(broadcasterId: string, id: string): Promise<Stream | null> {
    logger.info('in', { class: 'StreamRepositoryImpl', method: 'findById' });
    const item = await this.manager.get<Stream>(
      {
        hashKey: this.createHashKey(broadcasterId),
        rangeKey: this.createRangeKey(id),
      },
      { consistentRead: true }
    );
    logger.info('out', { class: 'StreamRepositoryImpl', method: 'findById' });
    return item;
  }

  async findAllByBroadcasterId(
    broadcasterId: string,
    nextToken?: string
  ): Promise<{ items: Stream[]; nextToken?: string }> {
    const [items, newNextToken] = await this.manager.query<Stream>(
      { hashKey: this.createHashKey(broadcasterId) },
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
    await this.manager.put({
      ...stream,
      hashKey: this.createHashKey(stream.broadcasterId),
      rangeKey: this.createRangeKey(stream.id),
      ttl: DynamodbManager.getTTL(60 * 60 * 24 * 30), // 30 days
    });
    const item = await this.findById(stream.broadcasterId, stream.id);
    if (!item) {
      throw new Error('Failed to save stream');
    }

    logger.info('out', { class: 'StreamRepositoryImpl', method: 'save' });
    return item;
  }

  private createHashKey(broadcasterId: string): string {
    return DynamodbManager.createHashKey('stream', [
      'broadcasterId',
      broadcasterId,
    ]);
  }

  private createRangeKey(streamId: string): string {
    return DynamodbManager.createRangeKey(['id', streamId]);
  }
}
