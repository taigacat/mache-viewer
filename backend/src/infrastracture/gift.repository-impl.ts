import { GiftRepository } from '../domain/repository/gift.repository';
import { injectable } from 'inversify';
import { GiftWithPoint } from '../domain/model/gift';
import { DynamodbManager } from './dynamodb/dynamodb-manager';
import 'reflect-metadata';
import { logger } from '../logger';
import { isEqual } from 'lodash';

@injectable()
export class GiftRepositoryImpl implements GiftRepository {
  private manager: DynamodbManager;

  constructor() {
    this.manager = DynamodbManager.getInstance();
  }

  async findByIndex(
    streamId: string,
    index: number
  ): Promise<GiftWithPoint | null> {
    const entity = {
      hashKey: this.createHashKey(streamId),
      rangeKey: this.createRangeKey(index),
    };
    const item = await this.manager.get<GiftWithPoint>(entity);
    if (item === null) {
      return null;
    }
    return item;
  }

  async findAllByStreamId(
    streamId: string,
    start: number = 0
  ): Promise<{ items: GiftWithPoint[] }> {
    const items: GiftWithPoint[] = await this.manager.queryAll<GiftWithPoint>(
      {
        hashKey: this.createHashKey(streamId),
      },
      {
        scanIndexForward: true,
        rangeKeyCondition: {
          ComparisonOperator: 'GE',
          AttributeValueList: [this.createRangeKey(start)],
        },
      }
    );
    return {
      items: items.map((item) => ({
        ...item,
        id: item.index,
      })),
    };
  }

  async saveAll(gifts: GiftWithPoint[]): Promise<void> {
    logger.info('in', { class: 'GiftRepositoryImpl', method: 'saveAll' });

    if (gifts.length === 0) {
      return Promise.resolve();
    }

    // index = 0 のギフトが正しいとは限らないのでチェックする
    if (gifts[0].index === 0) {
      const saved = await this.findAllByStreamId(gifts[0].streamId, 0);
      // 入力のギフトが保存済のギフトよりも短い場合は、ほかにギフト情報を送っている人がすでにいると見なすことができる。
      // 今までギフト情報を送っていた人がギフト情報を送らなくなった場合は、入力のギフトを保存済のギフトにつなげて保存するべきであるが、
      // 今回は実装せず、エラーを返す。
      if (saved && gifts.length < saved.items.length) {
        return Promise.reject();
      }

      // 入力のギフトが保存済のギフトと同じか長い場合、index=0から順に一致を確認する
      if (saved && saved.items.length <= gifts.length) {
        if (
          !isEqual(
            saved.items.map(({ index, name, count, sender }) => ({
              index,
              name,
              count,
              sender,
            })),
            gifts
              .slice(0, saved.items.length)
              .map(({ index, name, count, sender }) => ({
                index,
                name,
                count,
                sender,
              }))
          )
        ) {
          //
          return Promise.reject();
        } else {
          // 一致する場合は、途中から保存する
          gifts = gifts.slice(saved.items.length);
        }
      }
    }

    if (gifts.length === 0) {
      return Promise.resolve();
    }

    await this.manager.putAll(
      gifts.map((gift) => ({
        ...gift,
        hashKey: this.createHashKey(gift.streamId),
        rangeKey: this.createRangeKey(gift.index),
        updatedAt: new Date().toISOString(),
        ttl: DynamodbManager.getTTL(60 * 60 * 24 * 30), // 30 days
      }))
    );
    logger.info('out', { class: 'GiftRepositoryImpl', method: 'saveAll' });
  }

  async deleteAll(streamId: string): Promise<void> {
    logger.info('in', { class: 'GiftRepositoryImpl', method: 'deleteAll' });
    const { items } = await this.findAllByStreamId(streamId, 0);
    await this.manager.deleteAll(
      items.map(({ streamId, index }) => ({
        hashKey: this.createHashKey(streamId),
        rangeKey: this.createRangeKey(index),
      }))
    );
    logger.info('out', { class: 'GiftRepositoryImpl', method: 'deleteAll' });
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
