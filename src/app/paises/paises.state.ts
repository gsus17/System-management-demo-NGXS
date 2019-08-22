import { State, Action, StateContext } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';
import { Pais } from 'src/api/entities/pais.entity';
import { GetCountries, CreateCountry, UpdateCountry, DeleteCountry } from './paises.actions';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Columns } from './listado/listado.component';
import { ChangeProgressLinearState } from '../master-page/master-page.actions';

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
    dispatch(new ChangeProgressLinearState(true)); // Show progress linear.
    return this.paisesApiService.getPaises$()
      .pipe(
        tap((response) => {
          const dataSource = new MatTableDataSource<Columns>([]);
          setState({
            ...state,
            countries: response,
            dataSource: dataSource
          });
          dispatch(new ChangeProgressLinearState(false));
        }),
        mergeMap(() => dispatch(new ChangeProgressLinearState(false)))); // Hide progress linear.
  }

  @Action(CreateCountry)
  createCountry({ dispatch }: StateContext<CountryStateModel>, action: any) {
    dispatch(new ChangeProgressLinearState(true)); // Show progress linear.
    return this.paisesApiService.post(action.country)
      .finally(() => {
        dispatch(new ChangeProgressLinearState(false)); // Hide progress linear.
      });
  }

  @Action(UpdateCountry)
  updateCountry({ dispatch }: StateContext<CountryStateModel>, action: any) {
    dispatch(new ChangeProgressLinearState(true)); // Show progress linear.
    return this.paisesApiService.put(action.country)
      .finally(() => {
        dispatch(new ChangeProgressLinearState(false)); // Hide progress linear.
      });
  }

  @Action(DeleteCountry)
  deleteCountry({ dispatch }: StateContext<CountryStateModel>, action: any) {
    dispatch(new ChangeProgressLinearState(true)); // Show progress linear.
    return this.paisesApiService.deleteById(action.id)
      .finally(() => {
        dispatch(new ChangeProgressLinearState(false)); // Hide progress linear.
      });
  }
}
