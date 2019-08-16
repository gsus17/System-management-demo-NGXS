export class LoadInitData {
  static readonly type = '[Personas Form] Load init data';
  constructor(public editMode: boolean, public id: number) { }
}

export class BuildFormulario {
  static readonly type = '[Personas Form] Build formulario';
  constructor(public editMode: boolean, public id: number) { }
}

