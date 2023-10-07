import { Broadcaster } from '../model/broadcaster';

export interface BroadcasterRepository {
  /**
   * Find a broadcaster by id
   * @param id The id to find a broadcaster for
   */
  findById(id: string): Promise<Broadcaster | null>;

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
