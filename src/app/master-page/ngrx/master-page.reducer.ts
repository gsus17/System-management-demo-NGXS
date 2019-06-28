import {
  Action
} from '@ngrx/store';

import { createReducer, on } from '@ngrx/store';
import * as MasterPageActions from './master-page.actions';

// Inicial State
export const initialState: MasterPageState = {
  changeDynamicSubHeader: false,
  subHeader: ''
};

// Crea el reducer e ingresa los valores iniciales del state.
const masterPageReducer = createReducer(
  initialState,
  on(MasterPageActions.changeDynamicSubHeader, (state, action) => ({ ...state, changeDynamicSubHeader: action.dynamicSubHeader })),
  on(MasterPageActions.changeSubHeader, (state, action) => ({ ...state, subHeader: action.subHeader, changeDynamicSubHeader: true })),
  on(MasterPageActions.reset, state => ({ ...state, subHeader: '', changeDynamicSubHeader: false }))
);

// Devuelve la referencia del reducer.
export function reducer(state: MasterPageState | undefined, action: Action) {
  return masterPageReducer(state, action);
}

// MasterPage interface.
export interface MasterPageState {
  changeDynamicSubHeader: boolean;
  subHeader: string;
}
