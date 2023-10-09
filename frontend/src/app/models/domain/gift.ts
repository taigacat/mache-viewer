import { IdEntity } from '../entity/id-entity';

export interface Gift extends IdEntity {
  name: string;
  count: number;
  sender: string;
  type: 'smile' | 'point' | 'unknown';
  point: number;
  icon?: string;
}
