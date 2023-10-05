import { DynamodbEntity } from './dynamodb.entity';
import { Broadcaster } from '../../../domain/model/broadcaster';

export class BroadcasterDynamodbEntity
  extends DynamodbEntity
  implements Broadcaster
{
  id: string;
  name: string;

  constructor(broadcaster: Partial<Broadcaster>) {
    super();
    this.id = broadcaster.id || '';
    this.name = broadcaster.name || '';
  }

  getHashKey(): string {
    return DynamodbEntity.createHashKey('broadcaster');
  }

  getRangeKey(): string {
    return DynamodbEntity.createRangeKey(['id', this.id]);
  }
}
