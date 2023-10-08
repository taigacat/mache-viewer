import { GiftWithPoint } from '../model/gift';

export interface GiftRepository {
  /**
   * Find all gifts
   * @param streamId The stream id to find gifts for
   * @param start The start index to find gifts for
   * @param nextToken The next token to use for pagination
   */
  findAllByStreamId(
    streamId: string,
    start: number,
    nextToken?: string
  ): Promise<{ items: GiftWithPoint[]; nextToken?: string }>;

  /**
   * Save all gifts
   * @param gifts The gifts to save
   */
  saveAll(gifts: GiftWithPoint[]): Promise<void>;
}
