import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { DailyForecast } from '../models/weather';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ForecastActions, LocationtSelectors, ForecastSelectors } from '../store';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  dailyForecast$: Observable<DailyForecast>;
  activeDayPreview = 0;
  displayedDate = moment().format('DD.MM.YYYY');
  constructor(private store: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.store.pipe(select(LocationtSelectors.getCurrentLocation), take(1)).subscribe(
      location => {
        this.store.dispatch(new ForecastActions.GetForecast(location.coords));
      }
    );
    this.dailyForecast$ = this.store.pipe(select(ForecastSelectors.getDailyForecast));
  }

  changeDisplayedDate(date: string, index: number): void {
    this.activeDayPreview = index;
    this.displayedDate = date;
  }

  sortByDate = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    const aMoment = moment(a.key, 'DD.MM.YYYY');
    const bMoment = moment(b.key, 'DD.MM.YYYY');
    return aMoment.isBefore(bMoment) ? -1 : (bMoment.isAfter(aMoment) ? 1 : 0);
  }
}
