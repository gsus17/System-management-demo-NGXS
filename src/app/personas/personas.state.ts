import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasApiService } from 'src/api/personas/personas-api.service';
import { Paginator } from './listado/interfaces/paginator';
import { tap, mergeMap } from 'rxjs/operators';
import { AccountStatusSelect } from './listado/interfaces/account-status-select';
import {
  GetPersonas,
  DeletePersona,
  SetPaginator,
  SetAccountStatusSelected,
  CreatePersona,
  UpdatePersona
} from './personas.actions';
import { StatusItem } from './listado/interfaces/status-item';
import { AccountStatus } from 'src/api/entities/account-status.entity';
import { EnabledProgressLinearAction, DisabledProgressLinearAction } from '../master-page/master-page.actions';

export interface PersonStateModel {
  personList: Persona[];
  paginator: Paginator;
  statusSelected: AccountStatusSelect;
  statusList: StatusItem[];
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
    },
    statusList: [
      {
        keyTranslate: 'PERSON_LIST.STATUS_OPTION_ALL',
        value: null
      },
      {
        keyTranslate: 'PERSON_LIST.STATUS_OPTION_ACTIVE',
        value: AccountStatus.active
      },
      {
        keyTranslate: 'PERSON_LIST.STATUS_OPTION_INACTIVE',
        value: AccountStatus.inactive
      },
      {
        keyTranslate: 'PERSON_LIST.STATUS_OPTION_SUSPENDED',
        value: AccountStatus.suspended
      }
    ],
    statusSelected: {
      keyTranslate: 'PERSON_LIST.STATUS_OPTION_ALL',
      value: null
    }
  }
})
export class PersonasState {

  constructor(private personasApiService: PersonasApiService) { }

  @Action(GetPersonas)
  getPersonas({ getState, setState, dispatch }: StateContext<PersonStateModel>) {
    const state = getState();
    const { paginator, statusSelected } = getState();
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    return this.personasApiService
      .getPersonas$(paginator.pageIndex, paginator.pageSize, statusSelected.value)
      .pipe(
        tap((response) => {
          setState({
            ...state,
            personList: response
          });
        }),
        mergeMap(() => dispatch(new DisabledProgressLinearAction()))); // Hide progress linear.
  }

  @Action(CreatePersona)
  createPersona({ dispatch }: StateContext<PersonStateModel>, action) {
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    const formulario = action.form;
    const person: Persona = {
      id: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
      nombreCompleto: formulario.name,
      eMail: formulario.email,
      fechaCreo: new Date().toDateString(),
      fechaActualizo: new Date().toDateString(),
      totalAhorro: formulario.ahorro,
      porcAhorro: 0,
      obs: formulario.obs,
      direccion: formulario.address,
      lat: 0,
      lon: 0,
      estado: formulario.status,
      fechaNacimiento: formulario.birthdate.toDateString(),
      recibirNotificaciones: formulario.enableNotify,
      regionalData: formulario.regionalData,
      bienes: formulario.bienes,
      nacionalidad: formulario.nacionalidad,
      sexo: formulario.gender
    };

    return this.personasApiService.post(person)
      .finally(() => {
        dispatch(new DisabledProgressLinearAction()); // Hide progress linear.
      });
  }

  @Action(DeletePersona)
  deletePersona({ dispatch }: StateContext<PersonStateModel>, action) {
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    return this.personasApiService.deleteById(action.personId)
      .finally(() => {
        dispatch(new DisabledProgressLinearAction()); // Hide progress linear.
      });
  }

  @Action(UpdatePersona)
  updatePersona({ dispatch }: StateContext<PersonStateModel>, action) {
    dispatch(new EnabledProgressLinearAction()); // Show progress linear.
    const form = action.form;
    const person: Persona = {
      id: form.id,
      nombreCompleto: form.name,
      eMail: form.email,
      fechaCreo: new Date().toDateString(),
      fechaActualizo: new Date().toDateString(),
      totalAhorro: 0,
      porcAhorro: 0,
      obs: form.obs,
      direccion: form.address,
      lat: 0,
      lon: 0,
      estado: form.status,
      fechaNacimiento: form.birthdate.toDateString(),
      recibirNotificaciones: form.enableNotify,
      regionalData: form.regionalData,
      bienes: form.bienes,
      nacionalidad: form.nacionalidad,
      sexo: form.gender
    };

    return this.personasApiService.put(person)
      .finally(() => {
        dispatch(new DisabledProgressLinearAction()); // Hide progress linear.
      });
  }

  @Action(SetPaginator)
  setPaginator({ setState, getState, dispatch }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      paginator: {
        ...state.paginator,
        pageIndex: action.paginator.pageIndex,
        pageSize: action.paginator.pageSize
      }
    });

    dispatch(new GetPersonas());
  }

  @Action(SetAccountStatusSelected)
  setAccountStatusSelected({ setState, getState, dispatch }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      statusSelected: action.accountStatusSelected
    });

    dispatch(new GetPersonas());
  }
}
