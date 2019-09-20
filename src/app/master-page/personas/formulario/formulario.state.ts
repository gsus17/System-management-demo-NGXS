import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoadInitData, BuildFormulario, SetMasterPageSubHeader } from './formulario.actions';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { PersonasServiceSingleton } from '../personas.service';
import { Form } from './interfaces/formulario';
import { PersonasApiService } from 'src/api/personas/personas-api.service';

export interface PersonFormStateModel {
  viewdata: PersonasFormularioViewData;
  formulario: Form;
  masterPageSubHeader: string;
}

@State<PersonFormStateModel>({
  name: 'personsForm',
  defaults: {
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
    formulario: {
      id: null,
      address: '',
      obs: '',
      ahorro: 0,
      ahorroPercentage: 0,
      birthdate: new Date(),
      email: '',
      enableNotify: false,
      gender: null,
      name: '',
      status: null,
      bienes: [],
      nacionalidad: null,
      editMode: false,
      regionalData: {
        dateFormat: '',
        languageCode: '',
        timeFormat: '',
        timeZone: null
      }
    },
    masterPageSubHeader: ''
  }
})
export class PersonasFormState {
  constructor(
    private paisesApiService: PaisesApiService,
    private personasApiService: PersonasApiService,
    private personasService: PersonasServiceSingleton) {
  }

  @Action(LoadInitData)
  loadInitData({ setState, getState, dispatch }: StateContext<PersonFormStateModel>, action: any) {
    const state = getState();
    return this.paisesApiService.getPaises$()
      .pipe(
        tap((response) => {
          setState({
            ...state,
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
              titleForm: action.editMode ?
                'PERSON_FORM.SUBTITLE_EDIT' :
                'PERSON_FORM.SUBTITLE_ADD',
              buttonActionText: action.editMode ?
                'PERSON_FORM.UPDATE_BUTTON' :
                'PERSON_FORM.ADD_BUTTON',
              countries: response
            },
            formulario: {
              id: null,
              address: '',
              obs: '',
              ahorro: 0,
              ahorroPercentage: 0,
              birthdate: new Date(),
              email: '',
              enableNotify: false,
              gender: null,
              name: '',
              status: null,
              bienes: [],
              nacionalidad: null,
              editMode: false,
              regionalData: {
                dateFormat: '',
                languageCode: '',
                timeFormat: '',
                timeZone: null
              }
            },
          });
          if (action.id !== 0) {
            dispatch(new BuildFormulario(action.editMode, action.id));
          }
        })
      );
  }

  @Action(BuildFormulario)
  buildFormulario({ setState, getState, dispatch }: StateContext<PersonFormStateModel>, action: any) {
    const state = getState();
    return this.personasApiService.getPersonForm$(action.id, action.editMode)
      .pipe(
        tap((response: any) => {
          setState({
            ...state,
            formulario: response
          });

          dispatch(new SetMasterPageSubHeader(state.viewdata.titleForm));
        }));
  }

  @Action(SetMasterPageSubHeader)
  setMasterPageSubHeader({ setState, getState, dispatch }: StateContext<PersonFormStateModel>, action) {
    const state = getState();

    setState({
      ...state,
      masterPageSubHeader: action.subHeader
    });
  }
}
