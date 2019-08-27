import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { LocationData } from '../models/location';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './../state/app.reducer';
import * as LocationActions from '../state/app.actions';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.AppState>,
    private locationService: LocationService) { }

  ngOnInit() {

    this.store.dispatch(new LocationActions.GetLocation());
    // this.store.pipe(select(fromRoot.getCurrentLocation)).subscribe(
    //   (location: LocationData) => {
    //     console.log(location);
    //   }
    // );

    // this.locationService.getLocationFromGeo().subscribe(
    //   data => console.log(data)
    // );
    // this.store.dispatch( new LocationActions.LocationRecived( {lat: 222, lon: 333}));
  }

}
