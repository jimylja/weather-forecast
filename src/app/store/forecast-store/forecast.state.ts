import { DailyForecast } from '../../models/weather';

export interface ForecastState {
  forecast: DailyForecast;
  displayedExtraData: string;
}

export const initialState: ForecastState = {
  forecast: null,
  displayedExtraData: 'humidity'
};
