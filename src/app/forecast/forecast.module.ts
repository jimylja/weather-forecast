import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherPreviewComponent } from './weather-preview/weather-preview.component';
import { ForecastComponent } from './forecast.component';
import { ExtraDataComponent } from './weather-detail/extra-data/extra-data.component';
import { CelsiumPipe } from './celsium.pipe';

@NgModule({
  declarations: [
    ForecastComponent,
    WeatherDetailComponent,
    WeatherPreviewComponent,
    ExtraDataComponent,
    CelsiumPipe],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    ChartsModule,
  ]
})
export class ForecastModule { }
