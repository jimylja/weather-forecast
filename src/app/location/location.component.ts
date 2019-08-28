import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './../state/app.reducer';
import * as LocationActions from '../state/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  curLocation$: Observable<Location>;
  constructor(
    private store: Store<fromRoot.AppState>) { }

  ngOnInit() {

    this.store.dispatch(new LocationActions.GetLocation());
    this.curLocation$ = this.store.pipe(select(fromRoot.getCurrentLocation));
  }

}
