import { Action } from '@ngrx/store';
import { DailyForecast } from '../../models/weather';
import { Coordinates } from '../../models/location';

export enum ForecastActionsTypes {
  GetForecast = '[Forecast] Get Daily Forecast',
  ForecastRecived = '[Forecast] Forecast recived succesfully'
}
export class GetForecast implements Action {
  readonly type = ForecastActionsTypes.GetForecast;
  constructor(public payload: Coordinates) {}
}

export class ForecastRecived implements Action {
  readonly type = ForecastActionsTypes.ForecastRecived;
  constructor(public payload: DailyForecast) {}
}

export type ForecastActions = GetForecast | ForecastRecived;
