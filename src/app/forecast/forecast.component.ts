import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromForecast from './state/forecast.reducer';
import * as ForecastActions from './state/forecast.actions';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor( private store: Store<fromForecast.ForecastState>) { }

  ngOnInit() {

  }

}
