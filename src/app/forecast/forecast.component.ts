import { Component, OnInit } from '@angular/core';
import { DailyForecast } from '../models/weather';
import { Observable } from 'rxjs';
import { KeyValue } from '@angular/common';
import { Store, select } from '@ngrx/store';
import * as fromForecast from './state/forecast.reducer';
import * as fromRoot from '../state/app.reducer';
import * as ForecastActions from './state/forecast.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  dailyForecast$: Observable<DailyForecast>;
  activeDayPreview = 0;
  constructor(private store: Store<fromForecast.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getCurrentLocation)).subscribe(
      location => {
        this.store.dispatch(new ForecastActions.GetForecast(location.coords));
      }
    );
    this.dailyForecast$ = this.store.pipe(select(fromForecast.getDailyForecast));
  }

  changeDisplayedDate(date: string, index: number): void {
    this.activeDayPreview = index;
    this.store.dispatch(new ForecastActions.SetCurrentDate(date));
  }

  sortByDate = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    const aMoment = moment(a.key, 'DD.MM.YYYY');
    const bMoment = moment(b.key, 'DD.MM.YYYY');
    return aMoment.isBefore(bMoment) ? -1 : (bMoment.isAfter(aMoment) ? 1 : 0);
  }
}
