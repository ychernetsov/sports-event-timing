import { Action } from '@ngrx/store';


export interface ChartsState {

}

export const initialChartsState: ChartsState = {

};

export function ChartsReducer(state = initialChartsState, action: Action): ChartsState {
  switch (action.type) {

    default:
      return state;
  }
}
