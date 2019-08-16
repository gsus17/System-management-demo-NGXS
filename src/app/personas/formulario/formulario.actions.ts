export class LoadInitData {
  static readonly type = '[Personas Form] Load init data';
  constructor(public editMode: boolean, public id: number) { }
}

export class BuildFormulario {
  static readonly type = '[Personas Form] Build formulario';
  constructor(public editMode: boolean, public id: number) { }
}

export class SetMasterPageSubHeader {
  static readonly type = '[Personas Form] Set Master page subheader';
  constructor(public subHeader: string) { }
}
