import { Component, OnInit } from '@angular/core';
import { Weather } from '../../models/weather';
import { Store, select } from '@ngrx/store';
import * as fromForecast from '../state/forecast.reducer';
import * as moment from 'moment';
@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

  weatherFullInfo: Weather[];
  weatherGeneralInfo: Weather;
  dayTitle: string;
  daytimeDataIndex: number;

  constructor( private store: Store<fromForecast.State>) { }
  ngOnInit() {
    moment.locale('uk');
    this.store.pipe(select(fromForecast.getCurrentDateForecast)).subscribe(
    (weatherDetails: Weather[]) => {
      const displayedDate = moment(weatherDetails[0].dt_txt);
      const isCurrentDay = moment().isSame(displayedDate, 'date');
      this.dayTitle = displayedDate.format('dddd');
      this.daytimeDataIndex = isCurrentDay ? 0 : 2;
      this.weatherFullInfo = weatherDetails;
      this.weatherGeneralInfo = weatherDetails[this.daytimeDataIndex];
    }
);
  }
}
