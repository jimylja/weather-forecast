import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: 'WeatherForecast App',
      maxAge: 30,
      logOnly: environment.production
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBePK-HPIzCLejL8ceBclOAb39jgRWwsqU',
      libraries: ['places'],
      language: 'uk'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
