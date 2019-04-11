
import { ChartsActions, ChartsActionTypes } from './charts.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Results } from './model/results.model';


export interface ResultsState extends EntityState<Results> {
  resultsAdded: number,
  allResultsLoaded: boolean
}

export const adapter: EntityAdapter<Results> = createEntityAdapter<Results>()

export const initialResultsState: ResultsState = adapter.getInitialState( {
  resultsAdded: 0,
  allResultsLoaded: false
});

export function resultsReducer(state = initialResultsState, action: ChartsActions): ResultsState {
  switch (action.type) {

    case ChartsActionTypes.AllResultsLoaded:
    
        return adapter.addAll(action.payload.results, {...state, allResultsLoaded: true});

    case ChartsActionTypes.ResultAdded:

        return adapter.addOne(action.payload, state);
    
    case ChartsActionTypes.ResultUpdated:
    
        return adapter.updateOne({ id: action.id, changes: action.changes }, {...state, resultsAdded: state.resultsAdded + 1})
    
    case ChartsActionTypes.RemoveAllResults:
        return adapter.removeAll(state);
    
    default:
        return state;
  }
}

export const {
  selectAll
} = adapter.getSelectors();