import { GiftWithPoint } from '../../domain/model/gift';
import { Usecase } from '../usecase';
import { container } from '../../inversify.config';
import { TYPES } from '../../types';
import { GiftRepository } from '../../domain/repository/gift.repository';

export class GetGiftListUsecase
  implements
    Usecase<
      { streamId: string; start?: number; nextToken?: string },
      { items: GiftWithPoint[]; nextToken?: string }
    >
{
  async run(input: {
    streamId: string;
    start?: number;
    nextToken?: string;
  }): Promise<{ items: GiftWithPoint[]; nextToken?: string }> {
    const repository = container.get<GiftRepository>(TYPES.GiftRepository);
    return await repository.findAllByStreamId(
      input.streamId,
      input.start ? input.start : 0,
      input.nextToken
    );
  }
}
