import { Historical } from './historical';

/**
 * Broadcaster model
 */
export class Broadcaster extends Historical {
  /**
   * Broadcaster id
   */
  _id: string;

  /**
   * Broadcaster name
   */
  _name: string;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}
