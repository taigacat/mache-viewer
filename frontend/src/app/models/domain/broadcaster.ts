import { Identified } from '../common/identified';

export interface Broadcaster extends Identified {
  id: string;
  name: string;
  updatedAt: Date;
}
