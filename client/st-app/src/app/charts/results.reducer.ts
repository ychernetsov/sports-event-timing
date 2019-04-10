
import { ChartsActions, ChartsActionTypes } from './charts.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Results } from './model/results.model';


export interface ResultsState extends EntityState<Results> {
  //allChartsLoaded: boolean
}

export const adapter: EntityAdapter<Results> = createEntityAdapter<Results>()

export const initialResultsState: ResultsState = adapter.getInitialState( {
  //allChartsLoaded: false
});

export function resultsReducer(state = initialResultsState, action: ChartsActions): ResultsState {
  switch (action.type) {

    case ChartsActionTypes.AllResultsLoaded:
    
      return adapter.addAll(action.payload.results, state);

    default:
      return state;
  }
}

export const {
  selectAll
} = adapter.getSelectors();