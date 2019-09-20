import { Pais } from 'src/api/entities/pais.entity';

const FEATURE_KEY = '[Country]';

export class GetCountries {
  static readonly type = `${FEATURE_KEY} Get countries`;
  constructor() { }
}

export class GetCountriesSuccess {
  static readonly type = `${FEATURE_KEY} Get countries success`;
  constructor(public countries: Pais[]) { }
}

export class CreateCountry {
  static readonly type = `${FEATURE_KEY} Create country`;
  constructor(public country: Pais) { }
}

export class UpdateCountry {
  static readonly type = `${FEATURE_KEY} Update country`;
  constructor(public country: Pais) { }
}

export class DeleteCountry {
  static readonly type = `${FEATURE_KEY} Delete country`;
  constructor(public countryId: number) { }
}
