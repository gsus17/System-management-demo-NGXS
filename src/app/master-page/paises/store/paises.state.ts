import { State, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import {
  PaisesGetAction,
  PaisesCreateAction,
  PaisesUpdateAction,
  PaisesDeleteAction,
  PaisesGetSuccessAction
} from './paises.actions';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Columns } from '../listado/listado.component';
import { MasterPageEnabledProgressLinearAction, MasterPageDisabledProgressLinearAction } from '../../store/master-page.actions';
import { PaisesStateModel } from './paises.state-model';


@State<PaisesStateModel>({
  name: 'country',
  defaults: {
    countries: [],
    dataSource: undefined
  }
})
export class CountryState {

  constructor(private paisesApiService: PaisesApiService) { }

  @Action(PaisesGetAction)
  paisesGetAction({ dispatch }: StateContext<PaisesStateModel>) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.getPaises$()
      .pipe(
        tap((response) => dispatch(new PaisesGetSuccessAction(response))),
        catchError(() => dispatch(new MasterPageDisabledProgressLinearAction())));
  }

  @Action(PaisesGetSuccessAction)
  paisesGetSuccessAction({ setState, dispatch, getState }: StateContext<PaisesStateModel>, action: any) {
    const dataSource = new MatTableDataSource<Columns>([]);
    const state = getState();
    setState({
      ...state,
      countries: action.countries,
      dataSource: dataSource
    });
    dispatch(new MasterPageDisabledProgressLinearAction());
  }

  @Action(PaisesCreateAction)
  paisesCreateAction({ dispatch }: StateContext<PaisesStateModel>, action: any) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.post(action.country)
      .finally(() => dispatch(new MasterPageDisabledProgressLinearAction()));
  }

  @Action(PaisesUpdateAction)
  paisesUpdateAction({ dispatch }: StateContext<PaisesStateModel>, action: any) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.put(action.country)
      .finally(() => dispatch(new MasterPageDisabledProgressLinearAction()));
  }

  @Action(PaisesDeleteAction)
  paisesDeleteAction({ dispatch }: StateContext<PaisesStateModel>, action: any) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.deleteById(action.id)
      .finally(() => dispatch(new MasterPageDisabledProgressLinearAction()));
  }
}
