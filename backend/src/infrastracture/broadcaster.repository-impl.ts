import { Broadcaster } from '../domain/model/broadcaster';
import { BroadcasterRepository } from '../domain/repository/broadcaster.repository';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import { BroadcasterDynamodbEntity } from './dynamodb/entity/broadcaster.dynamodb.entity';
import { injectable } from 'inversify';

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
      nextToken
    );
    return {
      items,
      nextToken: newNextToken,
    };
  }

  async save(broadcaster: Broadcaster): Promise<Broadcaster> {
    return await this.manager.put(new BroadcasterDynamodbEntity(broadcaster));
  }
}
