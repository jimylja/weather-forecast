import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherPreviewComponent } from './weather-preview/weather-preview.component';
import { ForecastComponent } from './forecast.component';
import { ExtraDataComponent } from './weather-detail/extra-data/extra-data.component';

// import { StoreModule } from '@ngrx/store';
// import { forecastReducer } from './store/forecast.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { ForecastEffects } from './store/forecast.effects';


@NgModule({
  declarations: [ForecastComponent, WeatherDetailComponent, WeatherPreviewComponent, ExtraDataComponent],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    ChartsModule,
    // EffectsModule.forFeature([ForecastEffects]),
    // StoreModule.forFeature('dailyForecasts', forecastReducer)
  ]
})
export class ForecastModule { }
