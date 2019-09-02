import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './store/store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RootStoreModule,
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
