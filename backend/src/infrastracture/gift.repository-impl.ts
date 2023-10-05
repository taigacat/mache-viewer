import { GiftRepository } from '../domain/repository/gift.repository';
import { injectable } from 'inversify';
import { Gift } from '../domain/model/gift';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import { GiftDynamodbEntity } from './dynamodb/entity/gift.dynamodb.entity';
import 'reflect-metadata';

@injectable()
export class GiftRepositoryImpl implements GiftRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
  }

  async findAllByStreamId(
    streamId: string,
    start: number = 0,
    nextToken?: string
  ): Promise<{ items: Gift[]; nextToken?: string }> {
    const entity = new GiftDynamodbEntity({ streamId, index: start });
    const [items, newNextToken] = await this.manager.query(entity, {
      exclusiveStartKeyStr: nextToken,
      scanIndexForward: true,
      rangeKeyCondition: {
        ComparisonOperator: 'GE',
        AttributeValueList: [entity.getRangeKey()],
      },
    });
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
