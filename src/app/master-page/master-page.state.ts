import { State, Action, StateContext, Selector } from '@ngxs/store';
import { EnabledProgressLinearAction, DisabledProgressLinearAction } from './master-page.actions';

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

  @Action(EnabledProgressLinearAction)
  enabledProgressLinearAction({ setState }: StateContext<MasterPageStateModel>, payload: any) {
    setState({
      showProgressLinear: true
    });
  }

  @Action(DisabledProgressLinearAction)
  disabledProgressLinearAction({ setState }: StateContext<MasterPageStateModel>, payload: any) {
    setState({
      showProgressLinear: false
    });
  }
}
