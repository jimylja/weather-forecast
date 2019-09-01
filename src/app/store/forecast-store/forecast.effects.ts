import { Injectable } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import * as ForecastActions from './forecast.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DailyForecast } from '../../models/weather';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ForecastEffects {
  constructor(
    private actions$: Actions,
    private forecastService: ForecastService ) {}

    @Effect()
    getForecast$ = this.actions$.pipe(
      ofType(ForecastActions.ForecastActionsTypes.GetForecast),
      mergeMap((action: ForecastActions.GetForecast) => this.forecastService.getFiveDaysForeca(action.payload).pipe(
        map(
          (forecast: DailyForecast) => {
            return new ForecastActions.ForecastRecived(forecast);
          }
        )
      ))
    );
}
