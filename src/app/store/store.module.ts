import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ForecastEffects } from './forecast-store/forecast.effects';
import { LocationEffects } from './location-store/location.effects';
import { forecastReducer } from './forecast-store/forecast.reducer';
import { reducer } from './location-store/location.reducer';
@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature('location', reducer),
    StoreModule.forFeature('dailyForecasts', forecastReducer),
    EffectsModule.forFeature([ForecastEffects, LocationEffects]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [ ForecastEffects, LocationEffects ],
  declarations: []
})
export class RootStoreModule {}
