import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastActions, ForecastActionsTypes } from '../state/forecast.actions';
import * as fromRoot from '../../state/app.reducer';
import * as moment from 'moment';
import { DailyForecast } from '../../models/weather';

export interface ForecastState {
  forecast: DailyForecast;
  displayedDate: string;
}

export interface State extends fromRoot.AppState {
  forecast: ForecastState;
}

const initialState: ForecastState = {
  forecast: null,
  displayedDate: moment().format('DD.MM.YYYY')
};

const getForecastState = createFeatureSelector<ForecastState>('dailyForecasts');
export const getDisplaedDate = createSelector(
  getForecastState,
  state => state.displayedDate
);
export const getDailyForecast = createSelector(
  getForecastState,
  state => state.forecast
);

export function reducer(state = initialState, action: ForecastActions): ForecastState {
  switch (action.type) {
    case ForecastActionsTypes.ForecastRecived:
      return {
        ...state,
        forecast: action.payload};
    case ForecastActionsTypes.SetDisplayedDate:
      return {
        ...state,
        displayedDate: action.payload
      };
    case ForecastActionsTypes.GetForecast:
    default:
      return state;
  }
}
