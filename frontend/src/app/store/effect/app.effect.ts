import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppAction } from '../action/app.action';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Broadcaster } from '../../models/domain/broadcaster';
import { Stream } from '../../models/domain/stream';
import { Store } from '@ngrx/store';
import { Gift } from '../../models/domain/gift';

@Injectable()
export class AppEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}

  retrieveBroadcasters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAction.retrieveBroadcasters),
      map(() => {
        return AppAction.getBroadcastersRequest({});
      })
    )
  );

  getBroadcastersRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppAction.getBroadcastersRequest),
      switchMap(() =>
        this.http.get<{ items: Broadcaster[]; nextToken?: string }>(
          `${environment.baseUrl}/v1/broadcasters`
        )
      ),
      map((body: { items: Broadcaster[]; nextToken?: string }) =>
        AppAction.getBroadcastersResponse({
          broadcasters: body.items,
          nextToken: body.nextToken,
        })
      )
    );
  });

  selectBroadcaster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAction.selectBroadcaster),
      map(({ broadcaster }) => {
        return AppAction.getStreamsRequest({
          broadcasterId: broadcaster.id,
        });
      })
    )
  );

  getStreamsRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppAction.getStreamsRequest),
      switchMap(({ broadcasterId }) =>
        this.http
          .get<{ items: Stream[]; nextToken?: string }>(
            `${environment.baseUrl}/v1/streams?broadcasterId=${broadcasterId}`
          )
          .pipe(
            map((body) => {
              return [broadcasterId, body] as [
                string,
                { items: Stream[]; nextToken?: string },
              ];
            })
          )
      ),
      map(
        ([broadcasterId, body]: [
          string,
          { items: Stream[]; nextToken?: string },
        ]) => {
          return AppAction.getStreamsResponse({
            broadcasterId,
            streams: body.items,
            nextToken: body.nextToken,
          });
        }
      )
    );
  });

  selectStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAction.selectStream),
      map(({ stream }) => {
        return AppAction.getGiftsRequest({
          streamId: stream.id,
        });
      })
    )
  );

  getGiftsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAction.getGiftsRequest),
      switchMap(({ streamId }) =>
        this.http
          .get<{ items: Gift[]; nextToken?: string }>(
            `${environment.baseUrl}/v1/gifts?streamId=${streamId}`
          )
          .pipe(
            map((body) => {
              return [streamId, body] as [
                string,
                { items: Gift[]; nextToken?: string },
              ];
            })
          )
      ),
      map(([streamId, body]) => {
        return AppAction.getGiftsResponse({
          streamId,
          gifts: body.items,
          nextToken: body.nextToken,
        });
      })
    )
  );
}
