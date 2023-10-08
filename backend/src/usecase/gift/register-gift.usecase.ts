import { Usecase } from '../usecase';
import { Gift, giftPointMap } from '../../domain/model/gift';
import { GiftRepository } from '../../domain/repository/gift.repository';
import { TYPES } from '../../types';
import { container } from '../../inversify.config';
import { BroadcasterRepository } from '../../domain/repository/broadcaster.repository';
import { StreamRepository } from '../../domain/repository/stream.repository';
import { Broadcaster } from '../../domain/model/broadcaster';
import { Stream } from '../../domain/model/stream';
import { logger } from '../../logger';

export class RegisterGiftUsecase
  implements
    Usecase<
      {
        broadcaster: Broadcaster;
        stream: Stream;
        gifts: Gift[];
      },
      void
    >
{
  async run(input: {
    broadcaster?: Broadcaster;
    stream?: Stream;
    gifts: Gift[];
  }): Promise<void> {
    const giftRepository = container.get<GiftRepository>(TYPES.GiftRepository);
    const broadcasterRepository = container.get<BroadcasterRepository>(
      TYPES.BroadcasterRepository
    );
    const streamRepository = container.get<StreamRepository>(
      TYPES.StreamRepository
    );

    const { broadcaster, stream, gifts } = input;
    if (broadcaster) {
      await broadcasterRepository.save(broadcaster);
    }
    if (stream) {
      await streamRepository.save(stream);
    }
    await giftRepository.saveAll(
      gifts.map((gift) => {
        const pointInfo = giftPointMap[gift.name];
        if (!pointInfo) {
          logger.warn('gift not found', { gift });
          return { ...gift, type: 'unknown', point: 0 };
        }
        const { type, point } = giftPointMap[gift.name];
        return { ...gift, type, point };
      })
    );
  }
}
