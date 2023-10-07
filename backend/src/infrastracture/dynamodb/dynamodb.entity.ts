export interface DynamoDBEntity {
  hashKey: string;
  rangeKey: string;
  ttl?: number;
}
