import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Broadcaster } from '../../models/domain/broadcaster';
import { Gift } from '../../models/domain/gift';
import { Stream } from '../../models/domain/stream';

export const AppAction = createActionGroup({
  source: 'App',
  events: {
    /**
     * Broadcaster
     */
    retrieveBroadcasters: props<{ more: boolean }>(),
    getBroadcastersRequest: props<{ nextToken?: string }>(),
    getBroadcastersResponse: props<{
      broadcasters: Broadcaster[];
      nextToken?: string;
    }>(),
    selectBroadcaster: props<{ broadcasterId: string }>(),

    /**
     * Stream
     */
    getStreamsRequest: props<{ broadcasterId: string; more?: boolean }>(),
    getStreamsResponse: props<{
      broadcasterId: string;
      streams: Stream[];
      nextToken?: string;
    }>(),
    selectStream: props<{ broadcasterId: string; streamId: string }>(),

    /**
     * Gift
     */
    getGifts: props<{ streamId: string; more?: boolean }>(),
    getGiftsRequest: props<{
      streamId: string;
      start?: number;
      nextToken?: string;
    }>(),
    getGiftsResponse: props<{
      streamId: string;
      gifts: Gift[];
      nextToken?: string;
    }>(),
  },
});
