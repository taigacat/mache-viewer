import { IdEntity } from './id-entity';

export interface IListEntity<T extends IdEntity> {
  ids: string[];
  entities: { [key: string]: T };
  add(entities: T | T[]): void;
  get(id: string): T;
  getMany(ids: string[]): T[];
  getAll(): T[];
  update(entities: T | T[]): void;
  delete(id: string | string[]): void;
  clear(): void;
}

export class ListEntity<T extends IdEntity> implements IListEntity<T> {
  entities: { [key: string]: T } = {};
  ids: string[] = [];

  constructor(entities?: T[]) {
    if (entities) {
      this.add(entities);
    }
  }

  add(entities: T | T[]) {
    if (!entities) {
      return;
    }

    if (!Array.isArray(entities)) {
      entities = [entities];
    }

    this.entities = {
      ...this.entities,
      ...this.listToMap(entities),
    };
    this.ids = [...this.ids, ...this.getIds(entities)];
  }

  get(id: string): T {
    return this.entities[id];
  }

  getMany(ids: string[]): T[] {
    return ids.map((value) => this.get(value));
  }

  getAll(): T[] {
    return this.ids.map((value) => this.get(value));
  }

  update(entities: T | T[]) {
    if (!entities) {
      return;
    }

    if (!Array.isArray(entities)) {
      entities = [entities];
    }

    entities.forEach((value) => {
      this.entities[value.id] = value;
    });
  }

  /**
   * リストからアイテムを削除します
   * @param ids
   */
  delete(ids: string | string[]) {
    if (!ids) {
      return;
    }

    let idsArray: string[];

    if (!Array.isArray(ids)) {
      idsArray = [ids];
    } else {
      idsArray = ids;
    }

    idsArray.forEach((id) => {
      this.ids = this.ids.filter((value) => value !== id);
    });
  }

  clear() {
    this.entities = {};
    this.ids = [];
  }

  private getIds(entities: T[]): string[] {
    return entities.map((value) => value.id);
  }

  private listToMap(entities: T[]): { [key: string]: T } {
    return entities.reduce(
      (prev, cur) => ({
        ...prev,
        [cur.id]: cur,
      }),
      {}
    );
  }
}
