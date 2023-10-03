import { Broadcaster } from '../domain/model/broadcaster';
import { BroadcasterRepository } from '../domain/repository/broadcaster.repository';

export class BroadcasterRepositoryImpl implements BroadcasterRepository {
  constructor() {}

  async findAll(
    nextToken?: string
  ): Promise<{ items: Broadcaster[]; nextToken?: string }> {
    console.log(nextToken);
    return Promise.resolve({ items: [] });
  }

  async save(broadcaster: Broadcaster): Promise<Broadcaster> {
    console.log(broadcaster);
    return Promise.resolve(undefined);
  }
}
