import { ActionReducerMap } from '@ngrx/store';
import { Location } from '../models/location';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppActions, LocationActionTypes } from './app.actions';

export interface LocationState {
  location: Location;
}

export interface AppState {
  location: Location;
}

export const initialAppState: AppState = {location: null};

const getAppState = createFeatureSelector<AppState>('app');
export const getCurrentLocation = createSelector(
  getAppState,
  state => state.location
);

export const getCurrentPlace = createSelector(
  getAppState,
  state => state.location.place
);

export const reducers: ActionReducerMap<any> = {
  app: reducer
};

export function reducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {
    case LocationActionTypes.GetLocation:
      return state;
    case LocationActionTypes.LocationRecived:
      return {
        ...state,
        location: action.payload};
    default:
      return state;
  }
}
