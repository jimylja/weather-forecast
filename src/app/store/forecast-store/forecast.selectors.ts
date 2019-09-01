import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastState } from './forecast.state';

const getForecastState = createFeatureSelector<ForecastState>('dailyForecasts');
export const getDisplaedExtraDataType = createSelector(
  getForecastState,
  state => state.displayedExtraData
);

export const getDailyForecast = createSelector(
  getForecastState,
  state => state.forecast
);

export const getCurrentDateForecast = createSelector(
  getForecastState,
  (state, props) => {
    if (state.forecast) {
       return (state.forecast[props]);
    }
  }
);

