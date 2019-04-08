import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AllSportsmenRequested, ChartsActionTypes, AllSportsmenLoaded } from './charts.actions';
import {mergeMap, map} from "rxjs/operators";
import { ChartsService } from './services/charts.service';



@Injectable()
export class ChartsEffects {


  @Effect()
  loadAllSportsmen$ = this.actions$
    .pipe(
      ofType<AllSportsmenRequested>(ChartsActionTypes.AllSportsmenRequested),
      mergeMap(action => this.chartsService.getAllSportsmen()),
      map(sportsmen => {
        console.log("SSS ", sportsmen)
        return new AllSportsmenLoaded({sportsmen})
      })
    )
  constructor(private chartsService: ChartsService, private actions$: Actions) {}

}
