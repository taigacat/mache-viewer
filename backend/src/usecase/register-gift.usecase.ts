import { Usecase } from './usecase';
import { Gift } from '../domain/model/gift';
import { GiftRepository } from '../domain/repository/gift.repository';
import { TYPES } from '../types';
import { container } from '../inversify.config';
import { BroadcasterRepository } from '../domain/repository/broadcaster.repository';
import { StreamRepository } from '../domain/repository/stream.repository';
import { Broadcaster } from '../domain/model/broadcaster';
import { Stream } from '../domain/model/stream';

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
  constructor() {}

  async run(input: {
    broadcaster: Broadcaster;
    stream: Stream;
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
    await Promise.all([
      giftRepository.saveAll(gifts),
      broadcasterRepository.save(broadcaster),
      streamRepository.save(stream),
    ]);
  }
}
