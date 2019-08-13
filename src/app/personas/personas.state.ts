import { State, Action, StateContext } from '@ngxs/store';
import { Persona } from 'src/api/entities/persona.entity';
import { GetPersonas, SetPersonas } from './personas.actions';
import { PersonasApiService } from 'src/api/personas/personas-api.service';

export interface PersonStateModel {
  personList: Persona[];
}

@State<PersonStateModel>({
  name: 'persons',
  defaults: {
    personList: []
  }
})
export class PersonasState {

  constructor(private personasApiService: PersonasApiService) {

  }

  @Action(GetPersonas)
  getPersonas(ctx: StateContext<PersonStateModel>, action: any) {
    const state = ctx.getState();

    this.personasApiService.getPersonas$(action.pageIndex, action.pageSize)
      .subscribe((response) => {
        ctx.dispatch(new SetPersonas(response));
      });
  }

  @Action(SetPersonas)
  setPersonas(ctx: StateContext<PersonStateModel>, action) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      personList: action.personList
    });
  }
}
