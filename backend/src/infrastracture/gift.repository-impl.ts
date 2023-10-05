import { GiftRepository } from '../domain/repository/gift.repository';
import { injectable } from 'inversify';
import { Gift } from '../domain/model/gift';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import { GiftDynamodbEntity } from './dynamodb/entity/gift.dynamodb.entity';

@injectable()
export class GiftRepositoryImpl implements GiftRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
  }

  async findAllByStreamId(
    streamId: string,
    nextToken?: string
  ): Promise<{ items: Gift[]; nextToken?: string }> {
    const [items, newNextToken] = await this.manager.query(
      new GiftDynamodbEntity({ streamId }),
      nextToken
    );
    return {
      items,
      nextToken: newNextToken,
    };
  }

  async saveAll(gifts: Gift[]): Promise<void> {
    await this.manager.putAll(
      gifts.map((gift) => new GiftDynamodbEntity(gift))
    );
  }
}
