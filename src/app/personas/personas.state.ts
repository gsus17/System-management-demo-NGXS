import { State, Action, StateContext } from '@ngxs/store';
import { Persona } from 'src/api/entities/persona.entity';
import { GetPersonas, SetPersonas, FilterPersonas, DeletePersona, SetPaginator } from './personas.actions';
import { PersonasApiService } from 'src/api/personas/personas-api.service';
import { Paginator } from './listado/interfaces/paginator';

export interface PersonStateModel {
  personList: Persona[];
  paginator: Paginator;
}

@State<PersonStateModel>({
  name: 'persons',
  defaults: {
    personList: [],
    paginator: {
      length: 10,
      pageSize: 5,
      pageIndex: 0,
      previousPageIndex: 0,
      pageSizeOptions: [5, 10, 15, 20, 25]
    }
  }
})
export class PersonasState {

  constructor(private personasApiService: PersonasApiService) {

  }

  @Action(GetPersonas)
  getPersonas({ dispatch }: StateContext<PersonStateModel>, action: any) {
    this.personasApiService.getPersonas$(action.pageIndex, action.pageSize, action.accountStatus)
      .subscribe((response) => {
        dispatch(new SetPersonas(response));
      });
  }

  @Action(FilterPersonas)
  filterPersonas({ setState, getState }: StateContext<PersonStateModel>, action: any) {
    const state = getState();
    setState({
      ...state,
      personList: state.personList.filter((item) => item.estado === action.accountStatus)
    });
  }

  @Action(DeletePersona)
  deletePersona({ getState }: StateContext<PersonStateModel>, action) {
    return this.personasApiService.deleteById(action.personId);
  }

  @Action(SetPersonas)
  setPersonas({ setState, getState }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      personList: action.personList
    });
  }

  @Action(SetPaginator)
  setPaginator({ setState, getState }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      paginator: {
        ...state.paginator,
        pageIndex: action.paginator.pageIndex,
        pageSize: action.paginator.pageSize
      }
    });
  }
}
