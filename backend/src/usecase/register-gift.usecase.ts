import { Usecase } from './usecase';
import { Gift } from '../domain/model/gift';
import { inject } from 'inversify';
import { GiftRepository } from '../domain/repository/gift.repository';

export class RegisterGiftUsecase implements Usecase<Gift[], void> {
  giftRepository: GiftRepository;

  constructor(@inject('GiftRepository') giftRepository: GiftRepository) {
    this.giftRepository = giftRepository;
  }

  run() {
    // TODO: Save gifts
    this.giftRepository.saveAll([]);

    // TODO: Save broadcasters

    // TODO: Save streams
    return;
  }
}
