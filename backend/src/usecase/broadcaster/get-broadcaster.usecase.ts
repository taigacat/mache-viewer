import { Usecase } from '../usecase';
import { Broadcaster } from '../../domain/model/broadcaster';
import { container } from '../../inversify.config';
import { BroadcasterRepository } from '../../domain/repository/broadcaster.repository';
import { TYPES } from '../../types';

export class GetBroadcasterUsecase
  implements Usecase<string, Broadcaster | null>
{
  async run(input: string): Promise<Broadcaster | null> {
    const repository = container.get<BroadcasterRepository>(
      TYPES.BroadcasterRepository
    );

    return await repository.findById(input);
  }
}
