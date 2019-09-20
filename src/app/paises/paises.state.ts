import { State, Action, StateContext } from '@ngxs/store';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { Pais } from 'src/api/entities/pais.entity';
import { GetCountries, CreateCountry, UpdateCountry, DeleteCountry, GetCountriesSuccess } from './paises.actions';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Columns } from './listado/listado.component';
import { EnabledProgressLinearAction, DisabledProgressLinearAction } from '../master-page/master-page.actions';

export interface CountryStateModel {
  countries: Pais[];
  dataSource: MatTableDataSource<Columns>;
}

@State<CountryStateModel>({
  name: 'country',
  defaults: {
    countries: [],
    dataSource: undefined
  }
})
export class CountryState {

  constructor(private paisesApiService: PaisesApiService) { }

  @Action(GetCountries)
  getCountries({ getState, setState, dispatch }: StateContext<CountryStateModel>) {
    const state = getState();
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.getPaises$()
      .pipe(
        tap((response) => dispatch(new GetCountriesSuccess(response))),
        catchError(() => dispatch(new DisabledProgressLinearAction())));
  }

  @Action(GetCountriesSuccess)
  getCountriesSuccess({ setState, dispatch, getState }: StateContext<CountryStateModel>, action: any) {
    const dataSource = new MatTableDataSource<Columns>([]);
    const state = getState();
    setState({
      ...state,
      countries: action.countries,
      dataSource: dataSource
    });
    dispatch(new DisabledProgressLinearAction());
  }

  @Action(CreateCountry)
  createCountry({ dispatch }: StateContext<CountryStateModel>, action: any) {
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.post(action.country)
      .finally(() => {
        dispatch(new DisabledProgressLinearAction()); // Hide progress linear.
      });
  }

  @Action(UpdateCountry)
  updateCountry({ dispatch }: StateContext<CountryStateModel>, action: any) {
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.put(action.country)
      .finally(() => {
        dispatch(new DisabledProgressLinearAction()); // Hide progress linear.
      });
  }

  @Action(DeleteCountry)
  deleteCountry({ dispatch }: StateContext<CountryStateModel>, action: any) {
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    return this.paisesApiService.deleteById(action.id)
      .finally(() => {
        dispatch(new DisabledProgressLinearAction()); // Hide progress linear.
      });
  }
}
