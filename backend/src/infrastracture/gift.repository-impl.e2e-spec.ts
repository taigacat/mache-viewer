import { GiftWithPoint } from '../domain/model/gift';
import { container } from '../inversify.config';
import { GiftRepository } from '../domain/repository/gift.repository';
import { TYPES } from '../types';

describe('GiftRepositoryImpl e2e', () => {
  const giftRepository: GiftRepository = container.get(TYPES.GiftRepository);
  const STREAM_ID = 'test-stream-id';

  afterEach(async () => {
    await giftRepository.deleteAll(STREAM_ID);
  });

  it('should put and get', async () => {
    // Given
    const gift: GiftWithPoint = {
      streamId: STREAM_ID,
      name: 'test-name',
      count: 1,
      sender: 'test-sender',
      index: 1,
      point: 100,
      type: 'point',
    };

    // When
    await giftRepository.saveAll([gift]);
    const { items } = await giftRepository.findAllByStreamId(gift.streamId, 0);

    // Then
    expect(items).toHaveLength(1);
  });

  it('should get query result when pagination token exist', async () => {
    // Given
    const gift: GiftWithPoint = {
      streamId: STREAM_ID,
      name: 'test-name',
      count: 1,
      sender: 'test-sender',
      index: 1,
      point: 100,
      type: 'point',
    };

    // When
    await giftRepository.saveAll(
      [...Array(10000).keys()].map((index) => ({
        ...gift,
        index: index + 1,
      }))
    );
    const { items } = await giftRepository.findAllByStreamId(gift.streamId, 0);

    // Then
    expect(items).toHaveLength(10000);
    expect(items[0].index).toBe(1);
    expect(items[4999].index).toBe(5000);
    expect(items[9999].index).toBe(10000);
  });

  it('should get query result when start parameter exists', async () => {
    // Given
    const gift: GiftWithPoint = {
      streamId: STREAM_ID,
      name: 'test-name',
      count: 1,
      sender: 'test-sender',
      index: 1,
      point: 100,
      type: 'point',
    };

    // When
    await giftRepository.saveAll(
      [...Array(100).keys()].map((index) => ({
        ...gift,
        index: index + 1,
      }))
    );
    const { items } = await giftRepository.findAllByStreamId(gift.streamId, 51);

    // Then
    expect(items).toHaveLength(50);
  });

  it('should not be saved when data is empty', async () => {
    // Given
    const gifts: GiftWithPoint[] = [];

    // When
    await giftRepository.saveAll(gifts);
    const { items } = await giftRepository.findAllByStreamId(STREAM_ID, 0);

    // Then
    expect(items).toHaveLength(0);
  });

  it('should not be saved when the data is shorter then saved', async () => {
    // Given
    const gift: GiftWithPoint = {
      streamId: STREAM_ID,
      name: 'test-name',
      count: 1,
      sender: 'test-sender',
      index: 1,
      point: 100,
      type: 'point',
    };

    // When
    await giftRepository.saveAll([gift]);
    const { items } = await giftRepository.findAllByStreamId(gift.streamId, 0);

    // Then
    expect(items).toHaveLength(1);
  });
});
