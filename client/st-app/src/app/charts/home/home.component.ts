import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sportsmen } from '../model/sportmen.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllSportsmen, selectAllResults } from '../charts.selectors';
import { AllSportsmenRequested, AllResultsRequested } from '../charts.actions';
import { Results } from '../model/results.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sportsmen$: Observable<Sportsmen[]>;
  results$: Observable<Results[]>;
  forSportsmen = ['start_number', 'sportsmanName', 'sportsmanLastname'];
  forResults = ['start_number', 'sportsmanName', 'sportsmanLastname', 'finishing', 'crossed'];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.dispatch(new AllSportsmenRequested())
    this.sportsmen$ = this.store.pipe(
      select(selectAllSportsmen)
    )

    this.store.dispatch(new AllResultsRequested())
    this.results$ = this.store.pipe(
      select(selectAllResults)
    )
  }

}
