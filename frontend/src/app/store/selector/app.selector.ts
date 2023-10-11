import { AppState } from '../store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const appState = createFeatureSelector<AppState>('app');

export const AppSelector = {
  selectedBroadcaster: createSelector(
    appState,
    (state: AppState) => state.broadcasters.selected
  ),
  allBroadcasters: createSelector(appState, (state: AppState) =>
    state.broadcasters.data.getAll()
  ),
  selectedStream: createSelector(
    appState,
    (state: AppState) => state.streams.selected
  ),
  allStreams: createSelector(appState, (state: AppState) =>
    state.broadcasters.selected?.id &&
    state.streams.data[state.broadcasters.selected?.id]
      ? state.streams.data[state.broadcasters.selected?.id].getAll()
      : []
  ),
  allGifts: createSelector(appState, (state: AppState) =>
    state.streams.selected?.id && state.gifts[state.streams.selected?.id]
      ? state.gifts[state.streams.selected?.id].getAll()
      : []
  ),
  pointSummary: createSelector(appState, (state: AppState) =>
    state.streams.selected?.id && state.gifts[state.streams.selected?.id]
      ? state.gifts[state.streams.selected?.id]
          .getAll()
          .filter((gift) => gift.type === 'point')
          .reduce((acc, cur) => acc + cur.point * cur.count, 0)
      : 0
  ),
  smileSummary: createSelector(appState, (state: AppState) =>
    state.streams.selected?.id && state.gifts[state.streams.selected?.id]
      ? state.gifts[state.streams.selected?.id]
          .getAll()
          .filter((gift) => gift.type === 'smile')
          .reduce((acc, cur) => acc + cur.point * cur.count, 0)
      : 0
  ),
};
