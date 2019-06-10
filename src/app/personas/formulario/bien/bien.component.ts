import { Component, OnInit } from '@angular/core';
import { PersonasBienViewData } from './bien.viewdata';
import { PersonasServiceSingleton } from '../../personas.service';
import { Bien } from 'src/api/entities/bien.entity';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.scss']
})
export class BienComponent implements OnInit {

  /**
   * Datos del formulario bien.
   */
  public formulario: Bien;

  /**
   * Datos complementario de la vista.
   */
  public viewdata: PersonasBienViewData;

  /**
   * Validation Form control.
   */
  public bienForm = new FormGroup(
    {
      'descripcion': new FormControl('', [Validators.required]),
      'categories': new FormControl('', [Validators.required]),
      'valor': new FormControl('', [Validators.required])
    }
  );

  constructor(
    public dialogRef: MatDialogRef<BienComponent>,
    private personasService: PersonasServiceSingleton) { }

  // Convenience getter for easy access to form fields.
  get form() { return this.bienForm.controls; }

  ngOnInit() {

    this.viewdata = {
      categories: this.personasService.getCategoriesBienes()
    };

    this.formulario = {
      id: null,
      tipo: null,
      descripcion: null,
      valor: 0
    };
  }

  /**
   * Retorna el listado de errores.
   */
  public getErrors(indicator: string): ValidationErrors {
    const res = this.bienForm.get(`${indicator}`).errors;
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
