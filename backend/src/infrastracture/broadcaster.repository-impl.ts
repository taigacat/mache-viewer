import { Broadcaster } from '../domain/model/broadcaster';
import { BroadcasterRepository } from '../domain/repository/broadcaster.repository';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import { BroadcasterDynamodbEntity } from './dynamodb/entity/broadcaster.dynamodb.entity';
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
    const [items, newNextToken] = await this.manager.query(
      new BroadcasterDynamodbEntity({}),
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
    const response = await this.manager.put(
      new BroadcasterDynamodbEntity(broadcaster)
    );
    logger.info('out', { class: 'BroadcasterRepositoryImpl', method: 'save' });
    return response;
  }
}
