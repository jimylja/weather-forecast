import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RootStoreState, LocationtActions, LocationtSelectors } from './store';
import { Location } from '@angular/common';
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
    private location: Location,
    private router: Router,
    private store: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.isPlaceEdit = this.location.path().includes('/location');
    this.store.dispatch(new LocationtActions.GetLocation());
    this.currentPlace$ = this.store.pipe(select(LocationtSelectors.getCurrentPlace));
  }

  openPlacePicker() {
    this.isPlaceEdit = this.location.path().includes('/location');
    if (!this.isPlaceEdit) {
      this.router.navigate(['/location']);
    } else {
      this.router.navigate(['/']);
    }
    this.isPlaceEdit = !this.isPlaceEdit;
  }
}
