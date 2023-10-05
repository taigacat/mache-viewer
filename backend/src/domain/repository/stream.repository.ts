import { Stream } from '../model/stream';

export interface StreamRepository {
  /**
   * Find all streams
   * @param broadcasterId The broadcaster id to find streams for
   * @param nextToken The next token to use for pagination
   */
  findAllByBroadcasterId(
    broadcasterId: string,
    nextToken?: string
  ): Promise<{ items: Stream[]; nextToken?: string }>;

  /**
   * Save a stream
   * @param stream The stream to save
   */
  save(stream: Stream): Promise<Stream>;
}
