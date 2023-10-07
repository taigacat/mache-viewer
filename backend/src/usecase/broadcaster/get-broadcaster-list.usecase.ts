import { Usecase } from '../usecase';
import { Broadcaster } from '../../domain/model/broadcaster';
import { container } from '../../inversify.config';
import { BroadcasterRepository } from '../../domain/repository/broadcaster.repository';
import { TYPES } from '../../types';

export class GetBroadcasterListUsecase
  implements
    Usecase<
      { nextToken: string },
      { items: Broadcaster[]; nextToken?: string }
    >
{
  async run(input: {
    nextToken?: string;
  }): Promise<{ items: Broadcaster[]; nextToken?: string }> {
    const broadcasterRepository = container.get<BroadcasterRepository>(
      TYPES.BroadcasterRepository
    );
    return await broadcasterRepository.findAll(input.nextToken);
  }
}
