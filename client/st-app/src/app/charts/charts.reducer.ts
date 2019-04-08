import { Sportsmen } from './model/sportmen.model';
import { ChartsActions, ChartsActionTypes } from './charts.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'


export interface ChartsState extends EntityState<Sportsmen> {

}

export const adapter: EntityAdapter<Sportsmen> = createEntityAdapter<Sportsmen>()

export const initialChartsState: ChartsState = adapter.getInitialState();

export function ChartsReducer(state = initialChartsState, action: ChartsActions): ChartsState {
  switch (action.type) {

    case ChartsActionTypes.AllSportsmenLoaded:
      return adapter.addAll(action.payload.sportsmen, state);

    default:
      return state;
  }
}

export const {
  selectAll
} = adapter.getSelectors();