import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location, Coordinates } from '../models/location';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocation(): Observable<Location> {
    if (localStorage.getItem('location') === null) {
      if (navigator.geolocation) {
        return this.getCoordsFromGeo().pipe(
          mergeMap(
            curCoords => this.getLocationPlace(curCoords)
          )
        );
      }
    } else {
      return of(JSON.parse(localStorage.getItem('location')) as Location);
    }
  }

  private getCoordsFromGeo(): Observable<Coordinates> {
    return new Observable(
      obsr => {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            const curCoords = {
              lon: position.coords.longitude,
              lat: position.coords.latitude
            };
            obsr.next(curCoords);
            obsr.complete();
          },
          error => { obsr.error(error); }
        );
      }
    ).pipe(
      catchError( err => this.getCoordsFromIp())
    ) as Observable<Coordinates>;
  }

  private getCoordsFromIp(): Observable<Coordinates> {
    const curentIP$ = this.http.get('https://jsonip.com/');
    return curentIP$.pipe(
      mergeMap( (ip: {ip: string}) => this.http.get(`http://ip-api.com/json/${ip.ip}`).pipe(
        map(
          (location: any) => {
            const coordinates = {lon: location.lon, lat: location.lat};
            return coordinates;
          }
        )
      ))
    );
  }

  private getLocationPlace( coords: { lat: number, lon: number}): Observable<Location> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${coords.lat},${coords.lon}`,
        language: 'uk-UA',
        key: 'AIzaSyBePK-HPIzCLejL8ceBclOAb39jgRWwsqU'}})
    .pipe(
      map( (place: any) => {
        const placeSlices = place.plus_code.compound_code.split(', ');
        placeSlices[0] = placeSlices[0].split(' ').pop();
        const [city, dist, country] = placeSlices;
        return { coords, place: {city, dist, country} };
      })
    );
  }
}
