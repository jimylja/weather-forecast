import { Action } from '@ngrx/store';
import { Weather } from '../../models/weather';

export enum ForecastActionsTypes {
  GetForecast = '[Forecast] Get Daily Forecast',
  ForecastRecived = '[Forecast] Forecast recived succesfully'
}

export class ForecastRecived implements Action {
  readonly type = ForecastActionsTypes.ForecastRecived;
  constructor(public payload: Weather) {}
}

export class GetForecast implements Action {
  readonly type = ForecastActionsTypes.GetForecast;
}

export type ForecastActions = GetForecast | ForecastRecived;
