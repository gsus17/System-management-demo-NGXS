import { Paginator } from '../listado/entities/paginator.entity';
import { AccountStatusSelect } from '../listado/entities/account-status-select.entity';
import { Bien } from 'src/api/entities/bien.entity';

const FEATURE_KEY = '[Personas]';

// Acciones de la vista listado

export class PersonasErrorAction {
  static readonly type = `${FEATURE_KEY} Get Error`;
  constructor(public error) { }
}

export class PersonasGetSuccessAction {
  static readonly type = `${FEATURE_KEY} Get Success`;
  constructor(public response) { }
}

export class PersonasGetAction {
  static readonly type = `${FEATURE_KEY} Get personas`;
  constructor() { }
}

export class PersonasCreateAction {
  static readonly type = `${FEATURE_KEY} Create person`;
  constructor() { }
}

export class PersonasUpdateAction {
  static readonly type = `${FEATURE_KEY} Update person`;
  constructor() { }
}

export class PersonaDeleteAction {
  static readonly type = `${FEATURE_KEY} Delete person`;
  constructor(public personId: number) { }
}

export class PersonaSetPaginatorAction {
  static readonly type = `${FEATURE_KEY} Set Paginator`;
  constructor(public paginator: Paginator) { }
}

export class PersonaSetAccountStatusSelectedAction {
  static readonly type = `${FEATURE_KEY} Set Account status selected`;
  constructor(public accountStatusSelected: AccountStatusSelect) { }
}

// Acciones de la vista formulario

export class PersonasFormBuildFormularioAction {
  static readonly type = `${FEATURE_KEY} Build formulario`;
  constructor() { }
}

export class PersonaFormSetMasterPageSubHeaderAction {
  static readonly type = `${FEATURE_KEY} Set Master page subheader`;
  constructor(public subHeader: string) { }
}

export class PersonaFormActivateEditModeAction {
  static readonly type = `${FEATURE_KEY} Activate edit mode`;
  constructor() { }
}

export class PersonasFormInitDefaultDataAction {
  static readonly type = `${FEATURE_KEY} Activate add mode`;
  constructor() { }
}
export class PersonaFormActivateAddModeAction {
  static readonly type = `${FEATURE_KEY} Init default data`;
  constructor() { }
}
export class PersonaFormSetPersonIdAction {
  static readonly type = `${FEATURE_KEY} Set person id`;
  constructor(public id) { }
}
export class PersonaFormSetBienesdAction {
  static readonly type = `${FEATURE_KEY} Set bienes`;
  constructor(public bienes: Bien) { }
}
export class PersonaFormDeleteBiendAction {
  static readonly type = `${FEATURE_KEY} Delete bienes`;
  constructor(public idx: number) { }
}
export class PersonaFormResetdAction {
  static readonly type = `${FEATURE_KEY} Reset form`;
  constructor() { }
}
