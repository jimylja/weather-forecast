import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastState } from './forecast.state';

const getForecastState = createFeatureSelector<ForecastState>('dailyForecasts');
export const getDisplaedDate = createSelector(
  getForecastState,
  state => state.displayedDate
);

export const getDailyForecast = createSelector(
  getForecastState,
  state => state.forecast
);

export const getCurrentDateForecast = createSelector(
  getForecastState,
  state => {
    if (state.forecast) {
       return (state.forecast[state.displayedDate]);
    }
  }
);
