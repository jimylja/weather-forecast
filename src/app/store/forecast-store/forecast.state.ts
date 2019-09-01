import * as moment from 'moment';
import { DailyForecast } from '../../models/weather';


export interface ForecastState {
  forecast: DailyForecast;
  displayedDate: string;
}

export const initialState: ForecastState = {
  forecast: null,
  displayedDate: moment().format('DD.MM.YYYY')
};
