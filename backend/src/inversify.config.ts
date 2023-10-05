import { Container } from 'inversify';
import { BroadcasterRepository } from './domain/repository/broadcaster.repository';
import { BroadcasterRepositoryImpl } from './infrastracture/broadcaster.repository-impl';
import { TYPES } from './types';
import { GiftRepository } from './domain/repository/gift.repository';
import { GiftRepositoryImpl } from './infrastracture/gift.repository-impl';
import { StreamRepository } from './domain/repository/stream.repository';
import { StreamRepositoryImpl } from './infrastracture/stream.repository-impl';

const container = new Container();

container
  .bind<BroadcasterRepository>(TYPES.BroadcasterRepository)
  .to(BroadcasterRepositoryImpl);
container.bind<GiftRepository>(TYPES.GiftRepository).to(GiftRepositoryImpl);
container
  .bind<StreamRepository>(TYPES.StreamRepository)
  .to(StreamRepositoryImpl);

export { container };
