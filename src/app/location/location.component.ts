import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Location, Coordinates } from '../models/location';
import { Store, select } from '@ngrx/store';
import { RootStoreState, LocationtActions, LocationtSelectors } from '../store';
import {} from '@agm/core/services/google-maps-types';
/// <reference types=”@types/googlemaps” />

declare var google: any;
export interface MapEventData {
  coords: {
    lat: number;
    lng: number;
  };
  placeId?: any;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {

  curCoords: Coordinates;
  newLocation: Location = {coords: {lat: 0, lon: 0}};
  mapZoom = 8;

  @ViewChild('search', {static: true}) public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.store.pipe(select(LocationtSelectors.getCurrentLocation)).subscribe(
      (location: Location) => this.curCoords = location.coords
    );
    this.initGooglePlaceSearch();
  }

  initGooglePlaceSearch(): void {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const coords = { lat: place.geometry.location.lat(),  lon: place.geometry.location.lng() };
          const placeSlices = place.formatted_address.split(', ');
          const [city, dist, country] = placeSlices;
          this.curCoords = coords;
          this.newLocation = {coords, place: {city, dist, country}};
        });
      });
    });
  }

  markerDragEnd(event: MapEventData): void {
    this.curCoords = { lat: event.coords.lat, lon: event.coords.lng};
    this.newLocation = {coords: this.curCoords};
  }

  mapClicked(event: MapEventData): void {
    this.curCoords = { lat: event.coords.lat, lon: event.coords.lng};
    this.newLocation = {coords: this.curCoords};
  }

  onSetNewLocation(): void {
    if (this.newLocation.place) {
      this.store.dispatch(new LocationtActions.LocationRecived(this.newLocation));
    } else {
      this.store.dispatch(new LocationtActions.GetLocationPlace(this.curCoords));
    }
  }
}
