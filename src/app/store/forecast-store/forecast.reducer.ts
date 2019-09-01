import { ForecastActions, ForecastActionsTypes } from './forecast.actions';
import { ForecastState, initialState } from './forecast.state';

export function forecastReducer(state = initialState, action: ForecastActions): ForecastState {
  switch (action.type) {
    case ForecastActionsTypes.ForecastRecived:
      return {
        ...state,
        forecast: action.payload};
    case ForecastActionsTypes.SetDisplayedExtraData:
      return {
        ...state,
        displayedExtraData: action.payload
      };
    case ForecastActionsTypes.GetForecast:
    default:
      return state;
  }
}
