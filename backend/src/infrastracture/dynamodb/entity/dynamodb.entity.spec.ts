import { DynamodbEntity } from './dynamodb.entity';

interface TestModel {
  id: string;
  name: string;
}

class DynamodbEntityTest extends DynamodbEntity implements TestModel {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  getHashKey(): string {
    return DynamodbEntityTest.createHashKey('test-object', ['id', this.id]);
  }

  getRangeKey(): string {
    return DynamodbEntityTest.createRangeKey(['name', this.name]);
  }
}

describe('DynamodbEntity', () => {
  it('should be defined', () => {
    // Given & When
    const dynamodbEntity = new DynamodbEntityTest('test-id', 'test-name');

    // Then
    expect(dynamodbEntity).toBeTruthy();
    expect(dynamodbEntity.hashKey).toBe('object="test-object";id="test-id";');
    expect(dynamodbEntity.rangeKey).toBe('name="test-name";');
  });
});
