import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasApiService } from 'src/api/personas/personas-api.service';
import { tap, catchError } from 'rxjs/operators';
import {
  PersonasGetAction,
  PersonaDeleteAction,
  PersonaSetPaginatorAction,
  PersonaSetAccountStatusSelectedAction,
  PersonasCreateAction,
  PersonasUpdateAction,
  PersonasFormBuildFormularioAction,
  PersonaFormSetMasterPageSubHeaderAction,
  PersonasGetSuccessAction,
  PersonasErrorAction,
  PersonaFormActivateEditModeAction,
  PersonaFormActivateAddModeAction,
  PersonasFormInitDefaultDataAction,
  PersonaFormSetPersonIdAction,
  PersonaFormSetBienesdAction,
  PersonaFormDeleteBiendAction,
  PersonaFormResetdAction
} from './personas.actions';
import { AccountStatus } from 'src/api/entities/account-status.entity';
import { MasterPageEnabledProgressLinearAction, MasterPageDisabledProgressLinearAction } from '../../store/master-page.actions';
import { PersonStateModel } from './persona.state-model';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { PersonasServiceSingleton } from '../personas.service';
import { UpdateFormValue } from '@ngxs/form-plugin';

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
    editMode: false,
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
    },
    viewdata: {
      isExpandedRegionalData: true,
      isExpandedBienes: true,
      inProgress: false,
      isLocked: false,
      sexos: [],
      accountStatusList: [],
      dateFormats: [],
      timeFormats: [],
      timeZones: [],
      languageCodes: [],
      titleForm: '',
      buttonActionText: '',
      countries: []
    },
    idToSearch: 0,
    form: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    },
    bienes: [],
    masterPageSubHeader: ''
  }
})
export class PersonasState {
  @Selector()
  static editMode(state: PersonStateModel) {
    return state.editMode;
  }

  constructor(
    private paisesApiService: PaisesApiService,
    private personasApiService: PersonasApiService,
    private personasService: PersonasServiceSingleton) { }

  @Action(PersonasGetAction)
  personasGetAction({ getState, dispatch }: StateContext<PersonStateModel>) {
    const { paginator, statusSelected } = getState();
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    return this.personasApiService
      .getPersonas$(paginator.pageIndex, paginator.pageSize, statusSelected.value)
      .pipe(
        tap((response: any) => dispatch(new PersonasGetSuccessAction(response))),
        catchError((error) => dispatch(new PersonasErrorAction(error))));
  }

  @Action(PersonaDeleteAction)
  personaDeleteAction({ dispatch }: StateContext<PersonStateModel>, action) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    return this.personasApiService.deleteById(action.personId)
      .finally(() => dispatch(new MasterPageDisabledProgressLinearAction()));
  }

  @Action(PersonaFormActivateEditModeAction)
  PersonaFormActivateEditModeAction({ patchState, dispatch }: StateContext<PersonStateModel>) {
    patchState({
      editMode: true
    });

    dispatch([new PersonasFormInitDefaultDataAction(), new PersonasFormBuildFormularioAction()]);
  }

  @Action(PersonaFormActivateAddModeAction)
  PersonaFormActivateAddModeAction({ patchState, dispatch }: StateContext<PersonStateModel>) {
    patchState({
      editMode: false
    });

    dispatch(new PersonasFormInitDefaultDataAction());
  }

  @Action(PersonasCreateAction)
  personasCreateAction({ dispatch, getState }: StateContext<PersonStateModel>) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    const { form, bienes } = getState();
    const person: Persona = {
      id: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
      nombreCompleto: form.model.name,
      eMail: form.model.email,
      fechaCreo: new Date().toDateString(),
      fechaActualizo: new Date().toDateString(),
      totalAhorro: form.model.ahorro,
      porcAhorro: form.model.ahorroPercentage,
      obs: form.model.obs,
      direccion: form.model.address,
      lat: 0,
      lon: 0,
      estado: form.model.status,
      fechaNacimiento: form.model.birthdate.toDateString(),
      recibirNotificaciones: form.model.enableNotify,
      regionalData: {
        dateFormat: form.model.dateFormats,
        languageCode: form.model.languageCodes,
        timeFormat: form.model.timeFormats,
        timeZone: form.model.timeZones
      },
      bienes: bienes,
      nacionalidad: form.model.nacionalidad,
      sexo: form.model.gender
    };

    return this.personasApiService.post(person)
      .finally(() => dispatch([new MasterPageDisabledProgressLinearAction(), new PersonaFormResetdAction()]));
  }

  @Action(PersonasUpdateAction)
  personasUpdateAction({ dispatch, getState }: StateContext<PersonStateModel>) {
    dispatch(new MasterPageEnabledProgressLinearAction()); // Show progress linear.
    const { form, bienes, idToSearch } = getState();
    const person: Persona = {
      id: idToSearch,
      nombreCompleto: form.model.name,
      eMail: form.model.email,
      fechaCreo: new Date().toDateString(),
      fechaActualizo: new Date().toDateString(),
      totalAhorro: form.model.ahorro,
      porcAhorro: form.model.ahorroPercentage,
      obs: form.model.obs,
      direccion: form.model.address,
      lat: 0,
      lon: 0,
      estado: form.model.status,
      fechaNacimiento: form.model.birthdate.toDateString(),
      recibirNotificaciones: form.model.enableNotify,
      regionalData: {
        dateFormat: form.model.dateFormats,
        languageCode: form.model.languageCodes,
        timeFormat: form.model.timeFormats,
        timeZone: form.model.timeZones
      },
      bienes: bienes,
      nacionalidad: form.model.nacionalidad,
      sexo: form.model.gender
    };

    return this.personasApiService.put(person)
      .finally(() => dispatch([new MasterPageDisabledProgressLinearAction(), new PersonaFormResetdAction()]));
  }

  @Action(PersonasFormInitDefaultDataAction)
  personasFormInitDefaultDataAction({ getState, patchState }: StateContext<PersonStateModel>) {
    const { editMode } = getState();
    return this.paisesApiService.getPaises$()
      .pipe(
        tap((response) => {
          patchState({
            viewdata: {
              isExpandedRegionalData: true,
              isExpandedBienes: true,
              inProgress: false,
              isLocked: false,
              sexos: this.personasService.getSexos(),
              accountStatusList: this.personasService.getAccountStatusList(),
              dateFormats: this.personasService.getDateFormats(),
              timeFormats: this.personasService.getTimeFormats(),
              timeZones: this.personasService.getTimeZones(),
              languageCodes: this.personasService.getLanguageCodes(),
              titleForm: editMode ?
                'PERSON_FORM.SUBTITLE_EDIT' :
                'PERSON_FORM.SUBTITLE_ADD',
              buttonActionText: editMode ?
                'PERSON_FORM.UPDATE_BUTTON' :
                'PERSON_FORM.ADD_BUTTON',
              countries: response
            }
          });
        })
      );
  }

  @Action(PersonaFormSetPersonIdAction)
  personaFormSetPersonIdAction({ patchState }: StateContext<PersonStateModel>, payload: any) {
    patchState({
      idToSearch: payload.id
    });
  }

  @Action(PersonasFormBuildFormularioAction)
  personasFormBuildFormularioAction({ patchState, getState, dispatch }: StateContext<PersonStateModel>) {
    const { idToSearch, viewdata } = getState();
    return this.personasApiService.getPersonForm$(idToSearch)
      .pipe(
        tap((response: any) => {
          patchState({
            bienes: response.bienes
          });

          dispatch([
            new PersonaFormSetMasterPageSubHeaderAction(viewdata.titleForm),
            new UpdateFormValue(
              {
                value: {
                  id: response.id,
                  name: response.name,
                  email: response.email,
                  fechaCreo: new Date().toDateString(),
                  fechaActualizo: new Date().toDateString(),
                  ahorro: response.ahorro,
                  ahorroPercentage: response.ahorroPercentage,
                  obs: response.obs,
                  address: response.address,
                  lat: 0,
                  lon: 0,
                  status: response.status,
                  birthdate: response.birthdate,
                  enableNotify: response.enableNotify,
                  regionalData: response.regionalData,
                  nacionalidad: response.nacionalidad,
                  gender: response.gender,
                  dateFormats: response.regionalData.dateFormat,
                  timeFormats: response.regionalData.timeFormat,
                  timeZones: response.regionalData.timeZone,
                  languageCodes: response.regionalData.languageCode
                },
                path: 'persons.form'
              })]);
        }));
  }

  @Action(PersonaFormSetMasterPageSubHeaderAction)
  personaFormSetMasterPageSubHeaderAction({ setState, getState }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      masterPageSubHeader: action.subHeader
    });
  }

  @Action(PersonaSetPaginatorAction)
  personaSetPaginatorAction({ setState, getState, dispatch }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      paginator: {
        ...state.paginator,
        pageIndex: action.paginator.pageIndex,
        pageSize: action.paginator.pageSize
      }
    });

    dispatch(new PersonasGetAction());
  }

  @Action(PersonaSetAccountStatusSelectedAction)
  personaSetAccountStatusSelectedAction({ setState, getState, dispatch }: StateContext<PersonStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      statusSelected: action.accountStatusSelected
    });

    dispatch(new PersonasGetAction());
  }

  @Action(PersonaFormSetBienesdAction)
  personaFormSetBienesdAction({ patchState, getState, dispatch }: StateContext<PersonStateModel>, action) {
    const { bienes } = getState();
    patchState({
      bienes: [...bienes, action.bienes]
    });

    dispatch(new PersonasGetAction());
  }

  @Action(PersonaFormDeleteBiendAction)
  personaFormDeleteBiendAction({ patchState, getState, dispatch }: StateContext<PersonStateModel>, payload) {
    const { bienes } = getState();
    patchState({
      bienes: bienes.filter((item) => item.id !== payload.idx)
    });

    dispatch(new PersonasGetAction());
  }

  @Action(PersonaFormResetdAction)
  personaFormResetdAction({ dispatch }: StateContext<PersonStateModel>) {
    dispatch(new UpdateFormValue(
      {
        value: {
          id: 0,
          name: '',
          email: '',
          fechaCreo: new Date().toDateString(),
          fechaActualizo: new Date().toDateString(),
          ahorro: 0,
          ahorroPercentage: 0,
          obs: '',
          address: '',
          lat: 0,
          lon: 0,
          status: null,
          birthdate: null,
          enableNotify: false,
          regionalData: null,
          nacionalidad: null,
          gender: null,
          dateFormats: null,
          timeFormats: null,
          timeZones: null,
          languageCodes: null
        },
        path: 'persons.form'
      }));
  }

  @Action(PersonasGetSuccessAction)
  personasGetSuccessAction({ setState, getState, dispatch }: StateContext<PersonStateModel>, payload) {
    const state = getState();
    dispatch(new MasterPageDisabledProgressLinearAction());
    setState({
      ...state,
      personList: payload.response
    });
  }

  @Action(PersonasErrorAction)
  personasErrorAction({ dispatch }: StateContext<PersonStateModel>, payload) {
    dispatch(new MasterPageDisabledProgressLinearAction());
    console.log('personasErrorAction %o', payload.error);
  }
}
