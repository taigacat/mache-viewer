import { Broadcaster } from '../models/domain/broadcaster';
import { PaginationEntity } from '../models/entity/pagination-eneity';
import { Stream } from '../models/domain/stream';
import { Gift } from '../models/domain/gift';

export interface AppState {
  broadcasters: {
    selected?: Broadcaster;
    data: PaginationEntity<Broadcaster>;
  };
  streams: {
    selected?: Stream;
    data: {
      [broadcasterId: string]: PaginationEntity<Stream>;
    };
  };
  gifts: {
    [streamId: string]: PaginationEntity<Gift>;
  };
}

export const initialState: AppState = {
  broadcasters: {
    selected: undefined,
    data: new PaginationEntity<Broadcaster>(),
  },
  streams: {
    selected: undefined,
    data: {},
  },
  gifts: {},
};
