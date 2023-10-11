import { createReducer, on } from '@ngrx/store';
import { initialState } from '../store';
import { AppAction } from '../action/app.action';
import { Broadcaster } from '../../models/domain/broadcaster';
import { PaginationEntity } from '../../models/entity/pagination-eneity';
import { Stream } from '../../models/domain/stream';
import { Gift } from '../../models/domain/gift';

export const appReducer = createReducer(
  initialState,
  on(AppAction.getBroadcastersResponse, (state, { broadcasters }) => ({
    ...state,
    broadcasters: {
      data: new PaginationEntity<Broadcaster>(broadcasters),
      selected: undefined,
    },
  })),
  on(AppAction.selectBroadcaster, (state, { broadcaster }) => ({
    ...state,
    broadcasters: {
      ...state.broadcasters,
      selected: state.broadcasters.data.get(broadcaster.id),
    },
  })),
  on(AppAction.getStreamsResponse, (state, { broadcasterId, streams }) => ({
    ...state,
    streams: {
      ...state.streams,
      data: {
        ...state.streams.data,
        [broadcasterId]: new PaginationEntity<Stream>(streams),
      },
    },
  })),
  on(AppAction.selectStream, (state, { broadcasterId, stream }) => ({
    ...state,
    streams: {
      ...state.streams,
      selected: state.streams.data[broadcasterId]?.get(stream.id),
    },
  })),
  on(AppAction.getGiftsResponse, (state, { streamId, gifts }) => ({
    ...state,
    gifts: {
      ...state.gifts,
      [streamId]: new PaginationEntity<Gift>(gifts),
    },
  }))
);
