export const FEATURE_KEY = '[Personas Form]';

export class LoadInitData {
  static readonly type = `${FEATURE_KEY} Load init data`;

  constructor(public editMode: boolean, public id: number) { }
}

export class BuildFormulario {
  static readonly type = `${FEATURE_KEY} Build formulario`;
  constructor(public editMode: boolean, public id: number) { }
}

export class SetMasterPageSubHeader {
  static readonly type = `${FEATURE_KEY} Set Master page subheader`;
  constructor(public subHeader: string) { }
}
