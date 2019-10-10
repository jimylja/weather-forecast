import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPreviewComponent } from './weather-preview.component';
import { CelsiumPipe } from '../celsium.pipe';

describe('WeatherPreviewComponent', () => {
  let component: WeatherPreviewComponent;
  let fixture: ComponentFixture<WeatherPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherPreviewComponent, CelsiumPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
