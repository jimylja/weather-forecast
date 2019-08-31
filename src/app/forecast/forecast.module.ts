import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherPreviewComponent } from './weather-preview/weather-preview.component';
import { ForecastComponent } from './forecast.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './state/forecast.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ForecastEffects } from './state/forecast.effects';
import { ExtraDataComponent } from './weather-detail/extra-data/extra-data.component';


@NgModule({
  declarations: [ForecastComponent, WeatherDetailComponent, WeatherPreviewComponent, ExtraDataComponent],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    ChartsModule,
    EffectsModule.forFeature([ForecastEffects]),
    StoreModule.forFeature('dailyForecasts', reducer)
  ]
})
export class ForecastModule { }
