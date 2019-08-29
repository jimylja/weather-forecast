import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromForecast from './state/forecast.reducer';
import * as fromRoot from '../state/app.reducer';
import * as ForecastActions from './state/forecast.actions';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private store: Store<fromForecast.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getCurrentLocation)).subscribe(
      location => {
        this.store.dispatch(new ForecastActions.GetForecast(location.coords));
      }
    );
  }
}
