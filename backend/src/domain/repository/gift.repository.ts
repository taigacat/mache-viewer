import { Gift } from '../model/gift';

export interface GiftRepository {
  /**
   * Find all gifts
   * @param streamId The stream id to find gifts for
   * @param nextToken The next token to use for pagination
   */
  findAllByStreamId(
    streamId: string,
    nextToken?: string
  ): Promise<{ items: Gift[]; nextToken?: string }>;

  /**
   * Save all gifts
   * @param gifts The gifts to save
   */
  saveAll(gifts: Gift[]): Promise<void>;
}
