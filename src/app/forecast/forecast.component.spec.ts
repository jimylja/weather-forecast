import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastComponent } from './forecast.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherPreviewComponent } from './weather-preview/weather-preview.component';
import { ExtraDataComponent } from './weather-detail/extra-data/extra-data.component';
import { FormsModule } from '@angular/forms';
import { CelsiumPipe } from './celsium.pipe';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastComponent,
        WeatherDetailComponent,
        WeatherPreviewComponent,
        CelsiumPipe
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
