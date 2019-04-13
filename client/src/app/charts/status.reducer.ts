import { ChartsActions, ChartsActionTypes } from './charts.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Status } from './model/status.model';


export interface StatusState extends EntityState<Status> {
  statusLoaded: boolean
}

export const adapter: EntityAdapter<Status> = createEntityAdapter<Status>()

export const initialStatusState: StatusState = adapter.getInitialState( {
  statusLoaded: false
});

export function statusReducer(state = initialStatusState, action: ChartsActions): StatusState {
  switch (action.type) {

    case ChartsActionTypes.StatusLoaded:

      return adapter.addAll(action.payload, {...state, statusLoaded: true});

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities
} = adapter.getSelectors();
