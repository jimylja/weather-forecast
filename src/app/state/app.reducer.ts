import { ActionReducerMap, MemoizedSelector } from '@ngrx/store';
import { LocationData } from '../models/location';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppActions, LocationActionTypes } from './app.actions';

export interface LocationState {
  location: LocationData;
}

export interface AppState {
  location: LocationData;
}

export const initialAppState: AppState = {location: null};

const getAppState = createFeatureSelector<AppState>('WeatherForecast App');
export const getCurrentLocation = createSelector(
  getAppState,
  state => state.location
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
