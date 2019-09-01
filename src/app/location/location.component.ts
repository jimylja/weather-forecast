import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../models/location';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, LocationtActions, LocationtSelectors } from '../store';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  curLocation$: Observable<Location>;
  @ViewChild('search', {static: true}) public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.store.dispatch(new LocationtActions.GetLocation());
    this.curLocation$ = this.store.pipe(select(LocationtSelectors.getCurrentLocation));
    this.initGooglePlaceSearch();
  }

  initGooglePlaceSearch() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const lat = place.geometry.location.lat();
          const lon = place.geometry.location.lng();
          const coords = { lat,  lon };

          const placeSlices = place.formatted_address.split(', ');
          const [city, dist, country] = placeSlices;
          this.store.dispatch(new LocationtActions.LocationRecived({coords, place: {city, dist, country}}));
        });
      });
    });
  }
}
