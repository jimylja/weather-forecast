import { Weather } from '../../models/weather';
import * as fromRoot from '../../state/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastActions, ForecastActionsTypes } from '../state/forecast.actions';

export interface ForecastState {
  forecast: Weather;
}

export interface State extends fromRoot.AppState {
  curLocation: ForecastState;
}

const getDailyForecastState = createFeatureSelector<ForecastState>('dailyForecasts');
export const getCurrentLocation = createSelector(
  getDailyForecastState,
  state => state.forecast
);

const initialState: ForecastState = {
  forecast: null
};

export function reducer(state = initialState, action: ForecastActions): ForecastState {
  console.log('reduser works');
  switch (action.type) {
    case ForecastActionsTypes.GetForecast:
      return state;
    case ForecastActionsTypes.ForecastRecived:
      return {
        ...state,
        forecast: action.payload};
    default:
      return state;
  }
}
