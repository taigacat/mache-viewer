import { GiftWithPoint } from '../model/gift';

export interface GiftRepository {
  /**
   * Find a gift by index
   * @param streamId The stream id to find gifts for
   * @param index The index to find gifts for
   */
  findByIndex(streamId: string, index: number): Promise<GiftWithPoint | null>;

  /**
   * Find all gifts
   * @param streamId The stream id to find gifts for
   * @param start The start index to find gifts for
   */
  findAllByStreamId(
    streamId: string,
    start: number
  ): Promise<{ items: GiftWithPoint[]; nextToken?: string }>;

  /**
   * Save all gifts
   * @param gifts The gifts to save
   */
  saveAll(gifts: GiftWithPoint[]): Promise<void>;

  /**
   * Delete all gifts
   * @param streamId The stream id to delete gifts for
   */
  deleteAll(streamId: string): Promise<void>;
}
