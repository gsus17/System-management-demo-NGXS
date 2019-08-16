import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Pais } from 'src/api/entities/pais.entity';
import { GetCountries, CreateCountry, UpdateCountry, DeleteCountry } from './paises.actions';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Columns } from './listado/listado.component';

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

  constructor(private paisesApiService: PaisesApiService) {

  }

  @Action(GetCountries)
  getCountries({ getState, setState, dispatch }: StateContext<CountryStateModel>) {
    const state = getState();
    return this.paisesApiService.getPaises$()
      .pipe(
        tap((response) => {
          const dataSource = new MatTableDataSource<Columns>([]);
          setState({
            ...state,
            countries: response,
            dataSource: dataSource
          });
        })
      );
  }


  @Action(CreateCountry)
  createCountry({ getState, setState, dispatch }: StateContext<CountryStateModel>, action: any) {
    const state = getState();
    return this.paisesApiService.post(action.country);
  }

  @Action(UpdateCountry)
  updateCountry({ getState, setState, dispatch }: StateContext<CountryStateModel>, action: any) {
    const state = getState();
    return this.paisesApiService.put(action.country);
  }

  @Action(DeleteCountry)
  deleteCountry({ getState, setState, dispatch }: StateContext<CountryStateModel>, action: any) {
    const state = getState();
    return this.paisesApiService.deleteById(action.id);
  }
}
