import { Gift } from '../domain/model/gift';
import { container } from '../inversify.config';
import { GiftRepository } from '../domain/repository/gift.repository';

describe('GiftRepositoryImpl e2e', () => {
  let giftRepository: GiftRepository = container.get('GiftRepository');

  beforeAll(() => {
    giftRepository = container.get('GiftRepository');
  }, 30000);

  it('should put and get', async () => {
    // Given
    const gift: Gift = {
      streamId: 'test-stream-id',
      name: 'test-name',
      count: 1,
      sender: 'test-sender',
      index: 1,
    };

    // When
    await giftRepository.saveAll([gift]);
    const { items } = await giftRepository.findAllByStreamId(
      gift.streamId,
      0,
      undefined
    );

    // Then
    expect(items).toHaveLength(1);
  });
});
