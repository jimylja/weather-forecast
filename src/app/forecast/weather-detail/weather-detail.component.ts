import { Component, Input, OnChanges } from '@angular/core';
import { Weather } from '../../models/weather';
import { RootStoreState, ForecastSelectors, ForecastActions } from '../../store';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

export interface ExtraData {
  [type: string]: Map<string, number>;
}

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})

export class WeatherDetailComponent implements OnChanges {

  weatherFullInfo: Weather[];
  weatherGeneralInfo: Weather;
  dayTitle: string;
  daytimeDataIndex: number;
  displayedExtraDataType = 'humidity';
  displayedExtraData: Map<string, number>;
  extraData: ExtraData = { temperature: null, humidity: null };
  @Input() displayedDate: string;

  constructor( private store: Store<RootStoreState.State>) {
    moment.locale('uk');
  }

  ngOnChanges() {
    combineLatest(
      this.store.select(ForecastSelectors.getCurrentDateForecast, this.displayedDate),
      this.store.select(ForecastSelectors.getDisplaedExtraDataType)
    ).subscribe( selectedData => {
      const weatherDetails: Weather[] = selectedData[0];
      const displayedExtraDataType: string = selectedData[1];
      const displayedDate = moment(weatherDetails[0].dt_txt);
      const isCurrentDay = moment().isSame(displayedDate, 'date');
      this.dayTitle = displayedDate.format('dddd');
      this.daytimeDataIndex = isCurrentDay ? 0 : 2;
      this.generateExtraData(weatherDetails);
      this.weatherGeneralInfo = weatherDetails[this.daytimeDataIndex];
      this.displayedExtraData = this.extraData[displayedExtraDataType];
    });
  }

  generateExtraData(weatherDetails: Weather[]): void {
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
    this.extraData.temperature = temperatureMap;
    this.extraData.humidity = humidityMap;
  }
  switchDisplayingExtra(dataType: 'temperature' | 'humidity'): void {
    if (dataType !== this.displayedExtraDataType) {
      this.store.dispatch(new ForecastActions.SetDisplayedExtraData(dataType));
      this.displayedExtraDataType = dataType;
    }
  }
}
