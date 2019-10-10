import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraDataComponent } from './extra-data.component';
import { ChartsModule } from 'ng2-charts';

describe('ExtraDataComponent', () => {
  let component: ExtraDataComponent;
  let fixture: ComponentFixture<ExtraDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraDataComponent ],
      imports: [ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
