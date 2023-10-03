export abstract class Historical {
  /**
   * Date that the entity was created
   */
  private _createdAt: Date;

  /**
   * Date that the entity was updated
   */
  private _updatedAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
