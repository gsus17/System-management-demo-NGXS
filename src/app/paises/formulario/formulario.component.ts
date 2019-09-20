import { Component, Inject } from '@angular/core';
import { ValidationErrors, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryForm } from './formulario.entity';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioCountryComponent {

  /**
   * Validation Form control.
   */
  public countryForm = new FormGroup(
    {
      'nombre': new FormControl('', [Validators.required]),
      'codigoIata': new FormControl('', [Validators.required])
    }
  );
  constructor(public dialogRef: MatDialogRef<FormularioCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountryForm) { }

  /**
   * Retorna el listado de errores.
   */
  public getErrors(indicator: string): ValidationErrors {
    const res = this.countryForm.get(`${indicator}`).errors;
    return res;
  }

  /**
   * Valida si esta precargado el error en el form.
   */
  public validateError(indicator) {
    const res = this.getErrors(`${indicator}`) !== null;
    return res;
  }

  /**
   * Cancela la creacion del bien.
   */
  public cancel(): void {
    this.dialogRef.close();
  }
}
