import { Sportsmen } from './model/sportmen.model';
import { ChartsActions, ChartsActionTypes } from './charts.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'


export interface ChartsState extends EntityState<Sportsmen> {
  allChartsLoaded: boolean,
  chartsLength: number
}

export const adapter: EntityAdapter<Sportsmen> = createEntityAdapter<Sportsmen>({
  sortComparer: (modelA, modelB) => modelA.start_number === modelB.start_number ? 0 : (modelA.start_number === modelB.start_number ? 1 : -1)
})

export const initialChartsState: ChartsState = adapter.getInitialState( {
  allChartsLoaded: false,
  chartsLength: null
});

export function chartsReducer(state = initialChartsState, action: ChartsActions): ChartsState {
  switch (action.type) {

    case ChartsActionTypes.AllSportsmenLoaded:

      return adapter.addAll(action.payload.sportsmen, {...state, allChartsLoaded: true, chartsLength: action.payload.sportsmen.length});

    default:
      return state;
  }
}

export const {
  selectAll
} = adapter.getSelectors();
