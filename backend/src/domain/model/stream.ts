import { Historical } from './historical';

export interface Stream extends Historical {
  broadcasterId: string;
  id: string;
}
