import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RootStoreState, LocationtActions, LocationtSelectors } from './store';
import { Location } from '@angular/common';
import { Place } from './models/location';
import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('enterFromTop', [
      transition('* => *',
        animate(200,
          keyframes([
            style({ transform: 'translateX(-20px)', opacity: 0, offset: 0 }),
            style({ transform: 'translateX(0px)', opacity: 1, offset: 0.8 })
          ])
        )
      ),
    ]),
      trigger('flip', [
        transition('* => *', animate(600,
          keyframes([
            style({ transform: 'rotateY(0)', opacity: 1, offset: 0 }),
            style({ transform: 'rotateY(180deg)', filter: 'blur(1px)', opacity: 1, offset: 0.8 }),
          ])
        ))
      ])
  ]
})

export class AppComponent implements OnInit {
  title = 'weather-forecast';
  isPlaceEdit: boolean;
  currentPlace$: Observable<Place>;

  constructor(
    private location: Location,
    private router: Router,
    private store: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.isPlaceEdit = this.location.path().includes('/location');
    this.store.dispatch(new LocationtActions.GetLocation());
    this.currentPlace$ = this.store.pipe(select(LocationtSelectors.getCurrentPlace));
  }

  openPlacePicker() {
    this.isPlaceEdit = this.location.path().includes('/location');
    if (!this.isPlaceEdit) {
      this.router.navigate(['/location']);
    } else {
      this.router.navigate(['/']);
    }
    this.isPlaceEdit = !this.isPlaceEdit;
  }
}
