export abstract class DynamodbEntity {
  /**
   * Hash key of the entity
   */
  private _hashKey?: string;

  /**
   * Range key of the entity
   */
  private _rangeKey?: string;

  /**
   * Date that the entity was created
   */
  private _createdAt?: Date;

  /**
   * Date that the entity was updated
   */
  private _updatedAt?: Date;

  /**
   * Time to live of the entity
   */
  private _ttl?: number;

  /**
   * Get the hash key of the entity
   */
  abstract getHashKey(): string;

  get hashKey(): string | undefined {
    return this.getHashKey();
  }

  /**
   * Get the range key of the entity
   */
  abstract getRangeKey(): string;

  get rangeKey(): string | undefined {
    return this.getRangeKey();
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get ttl(): number | undefined {
    return this._ttl;
  }

  set ttl(value: number) {
    this._ttl = value;
  }

  protected static createHashKey(
    object: string,
    ...keyValues: [string, string][]
  ): string {
    return `object="${object}";${keyValues
      .map(([key, value]) => `${key}="${value}";`)
      .join('')}`;
  }

  protected static createRangeKey(...keyValues: [string, string][]): string {
    if (keyValues.length === 0) {
      return ' ';
    }
    return keyValues.map(([key, value]) => `${key}="${value}";`).join('');
  }
}
