import { Container } from 'inversify';
import { BroadcasterRepository } from './domain/repository/broadcaster.repository';
import { BroadcasterRepositoryImpl } from './infrastracture/broadcaster.repository-impl';
import { GiftRepository } from './domain/repository/gift.repository';
import { GiftRepositoryImpl } from './infrastracture/gift.repository-impl';

const container = new Container();

// Register BroadcasterRepositoryImpl as BroadcasterRepository
container
  .bind<BroadcasterRepository>('BroadcasterRepository')
  .to(BroadcasterRepositoryImpl);

container.bind<GiftRepository>('GiftRepository').to(GiftRepositoryImpl);

export { container };
