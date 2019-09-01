import { Injectable } from '@angular/core';
import { LocationService } from '../../services/location.service';
import * as AppActions from './location.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Location } from '../../models/location';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class LocationEffects {
  constructor(
    private actions$: Actions,
    private locationService: LocationService ) {}

  @Effect()
  getLocation$ = this.actions$.pipe(
    ofType(AppActions.LocationActionTypes.GetLocation),
    mergeMap((action: AppActions.GetLocation) => this.locationService.getLocation().pipe(
      map( (location: Location) => {
        localStorage.setItem('location', JSON.stringify(location));
        return new AppActions.LocationRecived(location);
      })
    ))
  );

  @Effect()
  getLocationPlace$ = this.actions$.pipe(
    ofType(AppActions.LocationActionTypes.GetLocationPlace),
    mergeMap((action: AppActions.GetLocationPlace) => this.locationService.getLocationPlace(action.payload).pipe(
      map( (location: Location) => {
        localStorage.setItem('location', JSON.stringify(location));
        return new AppActions.LocationRecived(location);
      })
    ))
  );
}
