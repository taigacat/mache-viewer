import { Container } from 'inversify';
import { BroadcasterRepository } from './domain/repository/broadcaster.repository';
import { BroadcasterRepositoryImpl } from './infrastracture/broadcaster.repository-impl';

const container = new Container();

// Register BroadcasterRepositoryImpl as BroadcasterRepository
container
  .bind<BroadcasterRepository>('BroadcasterRepository')
  .to(BroadcasterRepositoryImpl);
