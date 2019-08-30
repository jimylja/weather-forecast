import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './state/app.reducer';
import * as LocationActions from './state/app.actions';

import { Place } from './models/location';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-forecast';
  isPlaceEdit: boolean;
  currentPlace$: Observable<Place>;

  constructor(
    private router: Router,
    private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.isPlaceEdit = this.router.url.includes('/location');
    this.store.dispatch(new LocationActions.GetLocation());
    this.currentPlace$ = this.store.pipe(select(fromRoot.getCurrentPlace));
  }

  openPlacePicker() {
    if (this.isPlaceEdit) {
      this.router.navigate(['/location']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
