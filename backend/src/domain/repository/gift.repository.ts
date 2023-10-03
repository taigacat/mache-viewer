import { Gift } from '../model/gift';

export interface GiftRepository {
  /**
   * Find all gifts
   * @param nextToken The next token to use for pagination
   */
  findAll(nextToken?: string): Promise<{ items: Gift[]; nextToken?: string }>;

  /**
   * Save all gifts
   * @param gifts The gifts to save
   */
  saveAll(gifts: Gift[]): Promise<Gift[]>;
}
