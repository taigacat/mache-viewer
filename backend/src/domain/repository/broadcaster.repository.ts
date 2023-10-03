import { Broadcaster } from '../model/broadcaster';

export interface BroadcasterRepository {
  /**
   * Find all broadcasters
   * @param nextToken The next token to use for pagination
   */
  findAll(
    nextToken?: string
  ): Promise<{ items: Broadcaster[]; nextToken?: string }>;

  /**
   * Save a broadcaster
   * @param broadcaster
   */
  save(broadcaster: Broadcaster): Promise<Broadcaster>;
}
