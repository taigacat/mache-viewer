import { Historical } from './historical';

/**
 * Broadcaster model
 */
export interface Broadcaster extends Historical {
  id: string;
  name: string;
}
