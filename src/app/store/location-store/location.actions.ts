import { Location, Coordinates } from '../../models/location';
import { Action } from '@ngrx/store';

export enum LocationActionTypes {
  GetLocation = '[Location] Get Location',
  GetLocationPlace = '[Location] Get Place Info',
  LocationRecived = '[Location] Location recived succesfully'
}

export class GetLocation implements Action {
  readonly type = LocationActionTypes.GetLocation;
}

export class GetLocationPlace implements Action {
  readonly type = LocationActionTypes.GetLocationPlace;
  constructor(public payload: Coordinates) {}
}

export class LocationRecived implements Action {
  readonly type = LocationActionTypes.LocationRecived;
  constructor( public payload: Location) {}
}

export type LocationActions = GetLocation | LocationRecived | GetLocationPlace;
