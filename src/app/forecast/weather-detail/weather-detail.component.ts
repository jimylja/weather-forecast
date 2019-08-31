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
  hourlyTemperatureMap: Map<string, number>;
  hourlyHumidityMap: Map<string, number>;
  displayedEtraData: Map<string, number>;

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
      const temperatureMap = new Map();
      const humidityMap = new Map();
      weatherDetails.forEach(
        detailsForHour => {
          const hour = moment(detailsForHour.dt_txt).format('LT');
          const temperature = (detailsForHour.main.temp - 273).toFixed(0);
          const humidity = (detailsForHour.main.humidity).toFixed(0);
          temperatureMap.set(hour, temperature);
          humidityMap.set(hour, humidity);
        }
      );
      this.hourlyHumidityMap = humidityMap;
      this.hourlyTemperatureMap = temperatureMap;
      this.displayedEtraData = this.hourlyHumidityMap;
    });
  }
}
