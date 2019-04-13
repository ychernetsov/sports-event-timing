import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AllSportsmenRequested, ChartsActionTypes, AllSportsmenLoaded, AllResultsRequested, AllResultsLoaded, StatusRequested, StatusLoaded } from './charts.actions';
import {mergeMap, map, withLatestFrom, filter} from "rxjs/operators";
import { ChartsService } from './services/charts.service';
import { allChartsLoaded, allResultsLoaded, statusLoaded } from './charts.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';



@Injectable()
export class ChartsEffects {

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
      withLatestFrom(this.store.pipe(select(allResultsLoaded))),
      filter(([action, allResultsLoaded]) => !allResultsLoaded),
      mergeMap(() => this.chartsService.getAllResults()),
      map(results => new AllResultsLoaded({results}))
    );

    @Effect()
    loadStatus$ = this.actions$
    .pipe(
      ofType<StatusRequested>(ChartsActionTypes.StatusRequested),
      withLatestFrom(this.store.pipe(select(statusLoaded))),
      filter(([action, statusLoaded]) => !statusLoaded),
      mergeMap(() => this.chartsService.getStatus()),
      map(status => new StatusLoaded(status))
    );
  constructor(private chartsService: ChartsService, private actions$: Actions, private store: Store<AppState>) {}

}
