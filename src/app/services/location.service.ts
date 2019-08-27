import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationData } from '../models/location';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocationFromGeo(): Observable<LocationData> {
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
          error => {
            obsr.error(error);
          }
        );
      }
    ) as Observable<LocationData>;
  }

  getLocationFromIp(): any {
    // const curIp$ = this.http.get('https://jsonip.com/');
    // curIp$.pipe(
    //   switchMap( (ip: {ip: string})  => this.http.get(`https://ipapi.co/${ip.ip}/json/`))
    // ).subscribe(
    //   data => console.log('location IP', data)
    // );
  }
}
