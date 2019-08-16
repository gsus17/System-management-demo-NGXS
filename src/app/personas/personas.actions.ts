import { Paginator } from './listado/interfaces/paginator';
import { AccountStatusSelect } from './listado/interfaces/account-status-select';
import { Form } from './formulario/interfaces/formulario';

export class GetPersonas {
  static readonly type = '[Personas] Get personas';
  constructor() { }
}
export class CreatePersona {
  static readonly type = '[Personas] Create person';
  constructor(public form: Form) { }
}

export class UpdatePersona {
  static readonly type = '[Personas] Update person';
  constructor(public form: Form) { }
}

export class DeletePersona {
  static readonly type = '[Personas] Delete person';
  constructor(public personId: number) { }
}

export class SetPaginator {
  static readonly type = '[Personas] Set Paginator';
  constructor(public paginator: Paginator) { }
}

export class SetAccountStatusSelected {
  static readonly type = '[Personas] Set Account status selected';
  constructor(public accountStatusSelected: AccountStatusSelect) { }
}
