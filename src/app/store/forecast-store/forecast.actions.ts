import { Action } from '@ngrx/store';
import { DailyForecast } from '../../models/weather';
import { Coordinates } from '../../models/location';

export enum ForecastActionsTypes {
  GetForecast = '[Forecast] Get Daily Forecast',
  ForecastRecived = '[Forecast] Daily Forecast was successfully received',
  SetDisplayedExtraData = '[Forecast] Set the type of the displayed extra details'
}
export class GetForecast implements Action {
  readonly type = ForecastActionsTypes.GetForecast;
  constructor(public payload: Coordinates) {}
}

export class ForecastRecived implements Action {
  readonly type = ForecastActionsTypes.ForecastRecived;
  constructor(public payload: DailyForecast) {}
}

export class SetDisplayedExtraData implements Action {
  readonly type = ForecastActionsTypes.SetDisplayedExtraData;
  constructor(public payload: string) {}
}

export type ForecastActions = GetForecast | ForecastRecived | SetDisplayedExtraData;
