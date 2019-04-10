import { Sportsmen } from './model/sportmen.model';
import { ChartsActions, ChartsActionTypes } from './charts.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { allChartsLoaded } from './charts.selectors';


export interface ChartsState extends EntityState<Sportsmen> {
  allChartsLoaded: boolean
}

export const adapter: EntityAdapter<Sportsmen> = createEntityAdapter<Sportsmen>()

export const initialChartsState: ChartsState = adapter.getInitialState( {
  allChartsLoaded: false
});

export function chartsReducer(state = initialChartsState, action: ChartsActions): ChartsState {
  switch (action.type) {

    case ChartsActionTypes.AllSportsmenLoaded:
    
      return adapter.addAll(action.payload.sportsmen, {...state, allChartsLoaded: true});

    default:
      return state;
  }
}

export const {
  selectAll
} = adapter.getSelectors();