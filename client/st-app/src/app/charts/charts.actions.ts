import { Action } from '@ngrx/store';
import { Sportsmen } from './model/sportmen.model';


export enum ChartsActionTypes {
  AllSportsmenRequested = '[Sportsmen Home Page] All Sportsmen Requested',
  AllSportsmenLoaded = '[Sportsmen API] All Sportsmen Loaded',
}


export class AllSportsmenRequested implements Action {

  readonly type = ChartsActionTypes.AllSportsmenRequested;

}

export class AllSportsmenLoaded implements Action {

  readonly type = ChartsActionTypes.AllSportsmenLoaded;

  constructor(public payload: { sportsmen: Sportsmen[] }) {

  }

}





export type ChartsActions =
  | AllSportsmenRequested
  | AllSportsmenLoaded
