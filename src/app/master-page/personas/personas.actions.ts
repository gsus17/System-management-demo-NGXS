import { Paginator } from './listado/interfaces/paginator';
import { AccountStatusSelect } from './listado/interfaces/account-status-select';
import { Form } from './formulario/interfaces/formulario';

const FEATURE_KEY = '[Personas]';

export class GetPersonas {
  static readonly type = `${FEATURE_KEY} Get personas`;
  constructor() { }
}

export class CreatePersona {
  static readonly type = `${FEATURE_KEY} Create person`;
  constructor(public form: Form) { }
}

export class UpdatePersona {
  static readonly type = `${FEATURE_KEY} Update person`;
  constructor(public form: Form) { }
}

export class DeletePersona {
  static readonly type = `${FEATURE_KEY} Delete person`;
  constructor(public personId: number) { }
}

export class SetPaginator {
  static readonly type = `${FEATURE_KEY} Set Paginator`;
  constructor(public paginator: Paginator) { }
}

export class SetAccountStatusSelected {
  static readonly type = `${FEATURE_KEY} Set Account status selected`;
  constructor(public accountStatusSelected: AccountStatusSelect) { }
}
