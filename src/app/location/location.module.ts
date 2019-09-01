import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBePK-HPIzCLejL8ceBclOAb39jgRWwsqU',
      libraries: ['places'],
      language: 'uk'
    })
  ]
})
export class LocationModule { }
