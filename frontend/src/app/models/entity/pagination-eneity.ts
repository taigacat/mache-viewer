import { IdEntity } from './id-entity';
import { IListEntity, ListEntity } from './list-entity';

export interface IPaginationEntity<T extends IdEntity> extends IListEntity<T> {
  nextToken?: string;
  add(entities: T | T[], lastEvaluatedKey?: string): void;
}

export class PaginationEntity<T extends IdEntity>
  extends ListEntity<T>
  implements IPaginationEntity<T>
{
  constructor(entities?: T[], nextToken?: string) {
    super(entities);
    this.nextToken = nextToken;
  }

  nextToken?: string;

  override add(entities: T | T[], nextToken?: string) {
    super.add(entities);
    this.nextToken = nextToken;
  }
}
