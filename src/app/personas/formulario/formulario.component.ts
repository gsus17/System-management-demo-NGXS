import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../personas.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { Form } from './formulario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass']
})
export class FormularioComponent implements OnInit {

  constructor(private personasService: PersonasService) { }

  /**
   * Validation Form control.
   */
  public personForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      ahorro: new FormControl('', [Validators.required]),
      ahorroPercentage: new FormControl('', [Validators.required]),
      enableNotify: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    }
  );

  // Convenience getter for easy access to form fields.
  get form() { return this.personForm.controls; }

  public formulario: Form;

  public viewdata: PersonasFormularioViewData;

  ngOnInit() {
    this.initForm();
    this.buildViewData();
  }

  /**
   * Inicializa el modelo.
   */
  private initForm() {
    this.formulario = {
      address: '',
      ahorro: 0,
      ahorroPercentage: 0,
      birthdate: new Date(),
      email: '',
      enableNotify: false,
      gender: null,
      name: '',
      status: null,
      bienes: [],
      regionalData: null
    };
  }

  /**
   * Construye el viewdata.
   */
  private buildViewData() {
    this.viewdata = {
      isExpandedRegionalData: true,
      isExpandedBienes: true,
      inProgress: false,
      isLocked: false,
      sexos: this.personasService.getSexos(),
      accountStatusList: this.personasService.getAccountStatusList(),
      dateFormats: this.personasService.getDateFormats(),
      timeFormats: this.personasService.getTimeFormats(),
      timeZones: this.personasService.getTimeZones(),
      languageCodes: this.personasService.getLanguageCodes()
    };
  }
}
