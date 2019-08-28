import { Location } from '../models/location';
import { Action } from '@ngrx/store';

export enum LocationActionTypes {
  GetLocation = '[App] Get Location',
  LocationRecived = '[App] Location recived succesfully'
}

export class GetLocation implements Action {
  readonly type = LocationActionTypes.GetLocation;
}

export class LocationRecived implements Action {
  readonly type = LocationActionTypes.LocationRecived;
  constructor( public payload: Location) {}
}

export type AppActions = GetLocation | LocationRecived;
