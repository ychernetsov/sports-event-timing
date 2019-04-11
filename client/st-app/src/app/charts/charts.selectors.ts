import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartsState } from './charts.reducer';
import * as fromCharts from './charts.reducer';
import { ResultsState } from './results.reducer';
import * as fromResults from './results.reducer';


export const selectChartsState = createFeatureSelector<ChartsState>("charts");

export const selectResultsState = createFeatureSelector<ResultsState>("results");

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

export const resultsAdded = createSelector(
    selectResultsState,
    resultsState => resultsState.resultsAdded
);

