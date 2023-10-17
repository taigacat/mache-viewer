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
  async run(input: { broadcasterId: string }): Promise<{ items: Stream[] }> {
    const streamRepository = container.get<StreamRepository>(
      TYPES.StreamRepository
    );
    const result = await streamRepository.findAllByBroadcasterId(
      input.broadcasterId
    );
    return {
      items: result.items.sort((a, b) => {
        if (!a.updatedAt || !b.updatedAt) {
          return 0;
        }
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }),
    };
  }
}
