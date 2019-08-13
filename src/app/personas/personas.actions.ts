import { Persona } from 'src/api/entities/persona.entity';

export class GetPersonas {
  static readonly type = '[Personas] Get personas';
  constructor(public pageIndex: number, public pageSize: number) { }
}

export class UpdatePersonas {
  static readonly type = '[Personas] Update person';
  constructor(public person: Persona) { }
}

export class DeletePersona {
  static readonly type = '[Personas] Delete person';
  constructor(public personId: number) { }
}


export class CreatePersona {
  static readonly type = '[Personas] Create person';
  constructor(public person: Persona) { }
}

export class SetPersonas {
  static readonly type = '[Personas] Set personas';
  constructor(public personList: any[]) { }
}
