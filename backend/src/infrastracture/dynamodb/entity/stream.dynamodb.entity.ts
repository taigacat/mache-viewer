import { DynamodbEntity } from './dynamodb.entity';
import { Stream } from '../../../domain/model/stream';

export class StreamDynamodbEntity extends DynamodbEntity implements Stream {
  broadcasterId: string;
  id: string;

  constructor(stream: Partial<Stream>) {
    super();
    this.broadcasterId = stream.broadcasterId || '';
    this.id = stream.id || '';
  }

  getHashKey(): string {
    return DynamodbEntity.createHashKey('stream', [
      'broadcasterId',
      this.broadcasterId,
    ]);
  }

  getRangeKey(): string {
    return DynamodbEntity.createRangeKey(['id', this.id]);
  }
}
