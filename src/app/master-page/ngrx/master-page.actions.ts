import { createAction, props } from '@ngrx/store';
export const changeSubHeader = createAction('[Master Page] Change name', props<{ subHeader: string; }>());
// tslint:disable-next-line:max-line-length
export const changeDynamicSubHeader = createAction('[Master Page] Change activateDynamicSubHeader', props<{ dynamicSubHeader: boolean; }>());
export const reset = createAction('[Master Page] Reseat state');
