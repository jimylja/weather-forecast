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

  private agregateForecastByDate(data: Array<Weather>): DailyForecast {
    let curDate = moment(data[0].dt_txt);
    let groupedData = [];
    return data.reduce(
      (result, item) => {
        const isSameDates = curDate.isSame(moment(item.dt_txt), 'date');
        if (isSameDates) {
          groupedData.push(item);
        } else {
          result[curDate.format('DD.MM.YYYY')] = groupedData;
          curDate = moment(item.dt_txt);
          groupedData = [];
        }
        return result;
      }, {});
  }
}
