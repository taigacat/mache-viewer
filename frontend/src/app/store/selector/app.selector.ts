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
};
