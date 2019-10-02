import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  AuthLoginAction,
  AuthEnabledProgressLinearAction,
  AuthDisabledProgressLinearAction,
  AuthLoginSuccessAction,
  AuthLoginErrorAction
} from './auth.actions';
import { AuthStateModel } from './auth.state-model';
import { Navigate } from '@ngxs/router-plugin';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    credentials: {
      username: null,
      password: null,
      token: null
    },
    user: null,
    showProgressLinear: false,
    form: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  },
})
export class AuthState {

  @Selector()
  static token(state: AuthStateModel) {
    return state.credentials.token;
  }

  constructor() { }

  @Action(AuthLoginAction)
  authLoginAction({ dispatch }: StateContext<AuthStateModel>) {
    dispatch([new AuthEnabledProgressLinearAction(), new AuthLoginSuccessAction()]);
  }

  @Action(AuthLoginSuccessAction)
  authLoginSuccessAction({ dispatch }: StateContext<AuthStateModel>) {

    dispatch([new Navigate(['master-page/personas/listado']), new AuthDisabledProgressLinearAction()]);
  }

  @Action(AuthLoginErrorAction)
  authLoginErrorAction({ dispatch }: StateContext<AuthStateModel>, payload) {
    console.log('authLoginErrorAction error%o', payload.error);
  }

  @Action(AuthEnabledProgressLinearAction)
  authEnabledProgressLinearAction({ patchState }: StateContext<AuthStateModel>, payload: any) {
    patchState({
      showProgressLinear: true
    });
  }

  @Action(AuthDisabledProgressLinearAction)
  authDisabledProgressLinearAction({ patchState }: StateContext<AuthStateModel>, payload: any) {
    patchState({
      showProgressLinear: false
    });
  }
}
