import { State, Action, StateContext } from '@ngxs/store';
import { MasterPageEnabledProgressLinearAction, MasterPageDisabledProgressLinearAction } from './master-page.actions';
import { MasterPageStateModel } from './master-page.state-model';


@State<MasterPageStateModel>({
  name: 'masterpage',
  defaults: {
    showProgressLinear: false
  }
})
export class MasterPageState {
  constructor() { }

  @Action(MasterPageEnabledProgressLinearAction)
  masterPageEnabledProgressLinearAction({ setState }: StateContext<MasterPageStateModel>) {
    setState({
      showProgressLinear: true
    });
  }

  @Action(MasterPageDisabledProgressLinearAction)
  masterPageDisabledProgressLinearAction({ setState }: StateContext<MasterPageStateModel>) {
    setState({
      showProgressLinear: false
    });
  }
}
