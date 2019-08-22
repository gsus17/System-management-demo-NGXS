import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ChangeProgressLinearState } from './master-page.actions';

export interface MasterPageStateModel {
  showProgressLinear: boolean;
}

@State<MasterPageStateModel>({
  name: 'masterpage',
  defaults: {
    showProgressLinear: false
  }
})
export class MasterPageState {
  constructor() { }

  @Action(ChangeProgressLinearState)
  changeProgressLinearState({ setState }: StateContext<MasterPageStateModel>, payload: any) {
    setState({
      showProgressLinear: payload.value
    });
  }
}
