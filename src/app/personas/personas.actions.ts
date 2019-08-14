import { Persona } from 'src/api/entities/persona.entity';
import { AccountStatus } from 'src/api/entities/account-status.entity';
import { Paginator } from './listado/interfaces/paginator';

export class GetPersonas {
  static readonly type = '[Personas] Get personas';
  constructor(public pageIndex: number, public pageSize: number, public accountStatus: AccountStatus) { }
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

export class FilterPersonas {
  static readonly type = '[Personas] Filter personas';
  constructor(public accountStatus: any) { }
}

export class SetPaginator {
  static readonly type = '[Personas] Set Paginator';
  constructor(public paginator: Paginator) { }
}

