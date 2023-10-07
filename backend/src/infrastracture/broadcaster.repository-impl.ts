import { Broadcaster } from '../domain/model/broadcaster';
import { BroadcasterRepository } from '../domain/repository/broadcaster.repository';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import { id, injectable } from 'inversify';
import 'reflect-metadata';
import { logger } from '../logger';

@injectable()
export class BroadcasterRepositoryImpl implements BroadcasterRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
  }

  async findById(id: string): Promise<Broadcaster | null> {
    logger.info('in', {
      class: 'BroadcasterRepositoryImpl',
      method: 'findById',
    });
    const item = await this.manager.get<Broadcaster>(
      {
        hashKey: this.createHashKey(),
        rangeKey: this.createRangeKey(id),
      },
      { consistentRead: true }
    );
    logger.info('out', {
      class: 'BroadcasterRepositoryImpl',
      method: 'findById',
    });
    return item;
  }

  async findAll(
    nextToken?: string
  ): Promise<{ items: Broadcaster[]; nextToken?: string }> {
    const [items, newNextToken] = await this.manager.query<Broadcaster>(
      { hashKey: this.createHashKey() },
      {
        exclusiveStartKeyStr: nextToken,
      }
    );
    return {
      items,
      nextToken: newNextToken,
    };
  }

  async save(broadcaster: Broadcaster): Promise<Broadcaster> {
    logger.info('in', { class: 'BroadcasterRepositoryImpl', method: 'save' });
    await this.manager.put({
      ...broadcaster,
      hashKey: this.createHashKey(),
      rangeKey: this.createRangeKey(broadcaster.id),
      ttl: DynamodbManager.getTTL(60 * 60 * 24 * 30), // 30 days
    });

    const item = await this.findById(broadcaster.id);
    if (!item) {
      throw new Error('Failed to save broadcaster');
    }

    logger.info('out', { class: 'BroadcasterRepositoryImpl', method: 'save' });
    return item;
  }
  private createHashKey(): string {
    return DynamodbManager.createHashKey('broadcaster');
  }

  private createRangeKey(id: string): string {
    return DynamodbManager.createRangeKey(['id', id]);
  }
}
