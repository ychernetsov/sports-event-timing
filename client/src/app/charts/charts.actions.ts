import { Action } from '@ngrx/store';
import { Sportsmen } from './model/sportmen.model';
import { Results } from './model/results.model';
import { Status } from './model/status.model';


export enum ChartsActionTypes {
  AllSportsmenRequested = '[Sportsmen Home Page] All Sportsmen Requested',
  AllSportsmenLoaded = '[Sportsmen API] All Sportsmen Loaded',

  AllResultsRequested = '[Results Home Page] All Results Requested',
  AllResultsLoaded = '[Results API] All Results Loaded',

  ResultAdded = '[Socket API] Result added',
  ResultUpdated = '[Socket API] Result updated',

  RemoveAllResults = '[Results Home Page] All results are removed from store',

  StatusRequested = '[Home Page] Status Requested',
  StatusLoaded = '[Home Page] Race status is loaded from DB'
}

export class StatusRequested implements Action {

  readonly type = ChartsActionTypes.StatusRequested;

}

export class StatusLoaded implements Action {

  readonly type = ChartsActionTypes.StatusLoaded;

  constructor(public payload: Status[] ) {

  }

}
export class AllSportsmenRequested implements Action {

  readonly type = ChartsActionTypes.AllSportsmenRequested;

}

export class AllSportsmenLoaded implements Action {

  readonly type = ChartsActionTypes.AllSportsmenLoaded;

  constructor(public payload: { sportsmen: Sportsmen[] }) {

  }

}

export class AllResultsRequested implements Action {

  readonly type = ChartsActionTypes.AllResultsRequested;

}

export class AllResultsLoaded implements Action {

  readonly type = ChartsActionTypes.AllResultsLoaded;

  constructor(public payload: { results: Results[] }) {

  }

}

export class ResultAdded implements Action {

  readonly type = ChartsActionTypes.ResultAdded;

  constructor(public payload:  Results ) {

  }

}

export class ResultUpdated implements Action {
  readonly type = ChartsActionTypes.ResultUpdated;
  constructor(
    public id: string,
    public changes: Partial<Results>,
  ) { }
}

export class RemoveAllResults implements Action {
  readonly type = ChartsActionTypes.RemoveAllResults;
}

export type ChartsActions =
  | AllSportsmenRequested
  | AllSportsmenLoaded
  | AllResultsRequested
  | AllResultsLoaded
  | ResultAdded
  | ResultUpdated
  | RemoveAllResults
  | StatusRequested
  | StatusLoaded;
