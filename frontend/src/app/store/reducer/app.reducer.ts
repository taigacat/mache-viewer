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
  on(AppAction.selectBroadcaster, (state, { broadcasterId }) => ({
    ...state,
    broadcasters: {
      ...state.broadcasters,
      selected: state.broadcasters.data.get(broadcasterId),
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
  on(AppAction.selectStream, (state, { broadcasterId, streamId }) => ({
    ...state,
    streams: {
      ...state.streams,
      selected: state.streams.data[broadcasterId]?.get(streamId),
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
