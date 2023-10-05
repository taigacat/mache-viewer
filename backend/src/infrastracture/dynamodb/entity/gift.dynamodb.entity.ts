import { DynamodbEntity } from './dynamodb.entity';
import { Gift } from '../../../domain/model/gift';

export class GiftDynamodbEntity extends DynamodbEntity implements Gift {
  streamId: string;
  count: number;
  index: number;
  name: string;
  sender: string;

  constructor(gift: Partial<Gift>) {
    super();
    this.streamId = gift.streamId || '';
    this.count = gift?.count || 0;
    this.index = gift?.index || 0;
    this.name = gift?.name || '';
    this.sender = gift?.sender || '';
  }

  getHashKey(): string {
    return GiftDynamodbEntity.createHashKey('gift', [
      'streamId',
      this.streamId,
    ]);
  }

  getRangeKey(): string {
    return GiftDynamodbEntity.createRangeKey(['index', `${this.index}`]);
  }
}
