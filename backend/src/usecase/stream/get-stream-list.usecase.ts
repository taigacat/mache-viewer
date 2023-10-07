import { Usecase } from '../usecase';
import { Stream } from '../../domain/model/stream';
import { container } from '../../inversify.config';
import { StreamRepository } from '../../domain/repository/stream.repository';
import { TYPES } from '../../types';

export class GetStreamListUsecase
  implements
    Usecase<
      { broadcasterId: string; nextToken?: string },
      { items: Stream[]; nextToken?: string }
    >
{
  async run(input: {
    broadcasterId: string;
    nextToken?: string;
  }): Promise<{ items: Stream[]; nextToken?: string }> {
    const streamRepository = container.get<StreamRepository>(
      TYPES.StreamRepository
    );
    return await streamRepository.findAllByBroadcasterId(
      input.broadcasterId,
      input.nextToken
    );
  }
}
