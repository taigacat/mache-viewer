import { Historical } from './historical';

export interface Gift extends Historical {
  streamId: string;
  index: number;
  name: string;
  count: number;
  sender: string;
}
