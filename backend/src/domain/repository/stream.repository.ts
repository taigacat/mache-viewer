import { Stream } from '../model/stream';

export interface StreamRepository {
  /**
   * Find a stream by id
   */
  findById(broadcasterId: string, id: string): Promise<Stream | null>;

  /**
   * Find all streams
   * @param broadcasterId The broadcaster id to find streams for
   */
  findAllByBroadcasterId(broadcasterId: string): Promise<{ items: Stream[] }>;

  /**
   * Save a stream
   * @param stream The stream to save
   */
  save(stream: Stream): Promise<Stream>;
}
