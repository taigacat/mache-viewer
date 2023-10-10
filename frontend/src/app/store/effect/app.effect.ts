import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppAction } from '../action/app.action';
import { map } from 'rxjs';

@Injectable()
export class AppEffect {
  constructor(private actions$: Actions) {}

  retrieveBroadcasters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAction.retrieveBroadcasters),
      map(() => {
        return AppAction.getBroadcastersRequest({});
      })
    )
  );

  getBroadcastersRequest$ = createEffect(() =>
    this.actions$.pipe(ofType(AppAction.getBroadcastersRequest))
  );
}
