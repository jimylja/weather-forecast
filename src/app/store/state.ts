import { ForecastState } from './forecast-store';
import { LocationtState } from './location-store';

export interface State {
  forecast: ForecastState.ForecastState;
  location: LocationtState.State;
}
