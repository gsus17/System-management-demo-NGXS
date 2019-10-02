import { Pais } from 'src/api/entities/pais.entity';

const FEATURE_KEY = '[Country]';

export class PaisesGetAction {
  static readonly type = `${FEATURE_KEY} Get countries`;
  constructor() { }
}

export class PaisesGetSuccessAction {
  static readonly type = `${FEATURE_KEY} Get countries success`;
  constructor(public countries: Pais[]) { }
}

export class PaisesCreateAction {
  static readonly type = `${FEATURE_KEY} Create country`;
  constructor(public country: Pais) { }
}

export class PaisesUpdateAction {
  static readonly type = `${FEATURE_KEY} Update country`;
  constructor(public country: Pais) { }
}

export class PaisesDeleteAction {
  static readonly type = `${FEATURE_KEY} Delete country`;
  constructor(public countryId: number) { }
}
