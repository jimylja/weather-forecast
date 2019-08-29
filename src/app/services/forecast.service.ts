import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from '../models/location';
import { Weather, DailyForecast } from '../models/weather';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class ForecastService {

  constructor(private http: HttpClient) { }

  getFiveDaysForeca(coords: Coordinates): Observable<DailyForecast> {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: `${coords.lat}`,
        lon: `${coords.lon}`,
        APPID: 'e6b8a83137a37adfa6bd17c461353826'
      }
    }).pipe(
      map( (resp: { cod: string, message: string, ctn: number, list: Array<Weather>, city: any }) => {
        return this.agregateForecastByDate(resp.list);
      })
    );
  }

  agregateForecastByDate(data: Array<Weather>): DailyForecast {
    let curDate = moment(data[0].dt_txt);
    let groupedData = [];
    const result = {};
    data.forEach(
      date => {
        const isSameDates = curDate.isSame(moment(date.dt_txt), 'date');
        if (isSameDates) {
          groupedData.push(date);
        } else {
          result[curDate.format('DD.MM.YYYY')] = groupedData;
          curDate = moment(date.dt_txt);
          groupedData = [];
        }
      }
    );
    return result;
  }

}
