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
    retrieveBroadcasters: emptyProps(),
    getBroadcastersRequest: emptyProps(),
    getBroadcastersResponse: props<{ broadcasters: Broadcaster[] }>(),
    selectBroadcaster: props<{ broadcasterId: string }>(),

    /**
     * Stream
     */
    getStreamsRequest: props<{ broadcasterId: string }>(),
    getStreamsResponse: props<{ broadcasterId: string; streams: Stream[] }>(),
    selectStream: props<{ broadcasterId: string; streamId: string }>(),

    /**
     * Gift
     */
    getGifts: props<{ streamId: string; more: boolean }>(),
    getGiftsRequest: props<{ streamId: string }>(),
    getGiftsResponse: props<{ streamId: string; gifts: Gift[] }>(),
  },
});
