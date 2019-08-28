import { Injectable } from '@angular/core';
import { LocationService } from '../services/location.service';
import * as AppActions from './app.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Location } from '../models/location';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class AppEffects {
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
        }
        )
      ))
    );
}
