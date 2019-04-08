import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sportsmen } from '../model/sportmen.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllSportsmen } from '../charts.selectors';
import { AllSportsmenRequested } from '../charts.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sportsmen$: Observable<Sportsmen[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.dispatch(new AllSportsmenRequested())
    this.sportsmen$ = this.store.pipe(
      select(selectAllSportsmen)
    )
  }

}
