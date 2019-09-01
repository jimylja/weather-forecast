import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './location.state';

const getLocationState = createFeatureSelector<State>('location');
export const getCurrentLocation = createSelector(
  getLocationState,
  state => state.location
);

export const getCurrentPlace = createSelector(
  getLocationState,
  state => state.location.place
);
