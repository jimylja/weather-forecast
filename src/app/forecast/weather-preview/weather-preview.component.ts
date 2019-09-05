import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../../models/weather';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-preview',
  templateUrl: './weather-preview.component.html',
  styleUrls: ['./weather-preview.component.scss']
})
export class WeatherPreviewComponent implements OnInit {
  @Input() forecast: Weather[];
  @Input() date: string;

  dayTitle: string;
  nightlyTemperature: number;
  daytimeTemperature: number;
  daytimeDataIndex: number;

  constructor() {}

  ngOnInit() {
    const curDate = moment(this.date, 'DD.MM.YYYY');
    const isCurrentDay = curDate.isSame(moment(), 'date');

    this.dayTitle = curDate.format('dd');
    this.daytimeDataIndex = isCurrentDay ? 0 : 2;
    this.daytimeTemperature = (this.forecast[this.daytimeDataIndex].main.temp);
    this.nightlyTemperature = (this.forecast[this.forecast.length - 1].main.temp);
  }
}
