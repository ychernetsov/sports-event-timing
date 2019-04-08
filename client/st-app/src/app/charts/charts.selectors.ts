import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartsState } from './charts.reducer';
import * as fromCharts from './charts.reducer';


export const selectChartsState = createFeatureSelector<ChartsState>("charts");

export const selectAllSportsmen = createSelector(
    selectChartsState,
    fromCharts.selectAll
)