import { Broadcaster } from '../domain/model/broadcaster';
import { BroadcasterRepository } from '../domain/repository/broadcaster.repository';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { logger } from '../logger';

@injectable()
export class BroadcasterRepositoryImpl implements BroadcasterRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
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
    const response = await this.manager.put({
      ...broadcaster,
      hashKey: this.createHashKey(),
      rangeKey: this.createRangeKey(broadcaster.id),
    });
    logger.info('out', { class: 'BroadcasterRepositoryImpl', method: 'save' });
    return response;
  }
  private createHashKey(): string {
    return DynamodbManager.createHashKey('stream');
  }

  private createRangeKey(id: string): string {
    return DynamodbManager.createRangeKey(['id', id]);
  }
}
