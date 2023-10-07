import { GiftRepository } from '../domain/repository/gift.repository';
import { injectable } from 'inversify';
import { Gift } from '../domain/model/gift';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import 'reflect-metadata';
import { logger } from '../logger';

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
    const entity = {
      hashKey: this.createHashKey(streamId),
      rangeKey: this.createRangeKey(start),
    };
    const [items, newNextToken] = await this.manager.query<Gift>(entity, {
      exclusiveStartKeyStr: nextToken,
      scanIndexForward: true,
      rangeKeyCondition: {
        ComparisonOperator: 'GE',
        AttributeValueList: [entity.rangeKey],
      },
    });
    return {
      items,
      nextToken: newNextToken,
    };
  }

  async saveAll(gifts: Gift[]): Promise<void> {
    logger.info('in', { class: 'GiftRepositoryImpl', method: 'saveAll' });

    if (gifts.length === 0) {
      return Promise.resolve();
    }

    await this.manager.putAll(
      gifts.map((gift) => ({
        ...gift,
        hashKey: this.createHashKey(gift.streamId),
        rangeKey: this.createRangeKey(gift.index),
        ttl: DynamodbManager.getTTL(60 * 60 * 24 * 30), // 30 days
      }))
    );
    logger.info('out', { class: 'GiftRepositoryImpl', method: 'saveAll' });
  }

  private createHashKey(streamId: string): string {
    return DynamodbManager.createHashKey('gift', ['streamId', streamId]);
  }

  private createRangeKey(index: number): string {
    return DynamodbManager.createRangeKey([
      'index',
      `${index.toString().padStart(10, '0')}`,
    ]);
  }
}
