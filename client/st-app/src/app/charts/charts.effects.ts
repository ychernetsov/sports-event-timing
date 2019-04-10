import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AllSportsmenRequested, ChartsActionTypes, AllSportsmenLoaded, AllResultsRequested, AllResultsLoaded } from './charts.actions';
import {mergeMap, map, withLatestFrom, filter} from "rxjs/operators";
import { ChartsService } from './services/charts.service';
import { allChartsLoaded } from './charts.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';



@Injectable()
export class ChartsEffects {


  // @Effect()
  // loadAllSportsmen$ = this.actions$
  //   .pipe(
  //     ofType<AllSportsmenRequested>(ChartsActionTypes.AllSportsmenRequested),
  //     mergeMap(action => this.chartsService.getAllSportsmen()),
  //     map(sportsmen => {
  //       return new AllSportsmenLoaded({sportsmen})
  //     })
  //   )

  @Effect()
  loadAllSportsmen$ = this.actions$
    .pipe(
      ofType<AllSportsmenRequested>(ChartsActionTypes.AllSportsmenRequested),
      withLatestFrom(this.store.pipe(select(allChartsLoaded))),
      filter(([action, allChartsLoaded]) => !allChartsLoaded),
      mergeMap(() => this.chartsService.getAllSportsmen()),
      map(sportsmen => new AllSportsmenLoaded({sportsmen}))
    );

  @Effect()
  loadAllResults$ = this.actions$
    .pipe(
      ofType<AllResultsRequested>(ChartsActionTypes.AllResultsRequested),
      // withLatestFrom(this.store.pipe(select(allChartsLoaded))),
      // filter(([action, allChartsLoaded]) => !allChartsLoaded),
      mergeMap(() => this.chartsService.getAllResults()),
      map(results => new AllResultsLoaded({results}))
    );

  constructor(private chartsService: ChartsService, private actions$: Actions, private store: Store<AppState>) {}

}
