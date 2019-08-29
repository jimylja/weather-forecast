import { DailyForecast } from '../../models/weather';
import * as fromRoot from '../../state/app.reducer';
import { ForecastActions, ForecastActionsTypes } from '../state/forecast.actions';

export interface ForecastState {
  forecast: DailyForecast;
}

export interface State extends fromRoot.AppState {
  forecast: ForecastState;
}

const initialState: ForecastState = {
  forecast: null
};

export function reducer(state = initialState, action: ForecastActions): ForecastState {
  switch (action.type) {
    case ForecastActionsTypes.ForecastRecived:
      return {
        ...state,
        forecast: action.payload};
    case ForecastActionsTypes.GetForecast:
    default:
      return state;
  }
}
