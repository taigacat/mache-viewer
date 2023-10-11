import { ActionReducer, MetaReducer } from '@ngrx/store';

export const metaReducers: MetaReducer<any>[] = [debug];

function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}
