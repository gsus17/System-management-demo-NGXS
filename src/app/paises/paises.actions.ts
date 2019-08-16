import { Pais } from 'src/api/entities/pais.entity';

export class GetCountries {
  static readonly type = '[Country] Get countries';
  constructor() { }
}

export class CreateCountry {
  static readonly type = '[Country] Create country';
  constructor(public country: Pais) { }
}

export class UpdateCountry {
  static readonly type = '[Country] Update country';
  constructor(public country: Pais) { }
}

export class DeleteCountry {
  static readonly type = '[Country] Delete country';
  constructor(public countryId: number) { }
}
