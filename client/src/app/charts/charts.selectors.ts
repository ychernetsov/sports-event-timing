import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartsState } from './charts.reducer';
import * as fromCharts from './charts.reducer';
import { ResultsState } from './results.reducer';
import * as fromResults from './results.reducer';
import { StatusState } from './status.reducer';
import * as fromStatus from './status.reducer';


export const selectChartsState = createFeatureSelector<ChartsState>("charts");

export const selectResultsState = createFeatureSelector<ResultsState>("results");

export const selectStatusState = createFeatureSelector<StatusState>("status");

export const selectAllSportsmen = createSelector(
    selectChartsState,
    fromCharts.selectAll
);

export const sportsmenCount = createSelector(
    selectAllSportsmen,
    sportsmen => sportsmen.length
);

export const allChartsLoaded = createSelector(
    selectChartsState,
    chartsState => chartsState.allChartsLoaded
);

export const allResultsLoaded = createSelector(
    selectResultsState,
    resultsState => resultsState.allResultsLoaded
);

export const selectAllResults = createSelector(
    selectResultsState,
    fromResults.selectAll
);

export const filterAllResults = createSelector(
  selectAllResults,
  results => results.sort()
);

export const resultsAdded = createSelector(
    selectResultsState,
    resultsState => resultsState.resultsAdded
);

export const resultsCount = createSelector(
  selectAllResults,
  results => results.length
);

export const raceFinished = createSelector(
  resultsCount,
  sportsmenCount,
  (results, sportsmen) => {
    console.log(results, sportsmen)
    return results === 0 ? false : results === sportsmen
  }
);

export const statusLoaded = createSelector(
  selectStatusState,
  status => status.statusLoaded
);

export const selectStatus = createSelector(
  selectStatusState,
  fromStatus.selectAll
);
