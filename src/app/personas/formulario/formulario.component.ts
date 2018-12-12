import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasService } from '../personas.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { Form } from './formulario';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BienComponent } from './bien/bien.component';
import { Bien } from 'src/api/entities/bien.entity';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass']
})
export class FormularioComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  /**
   * Validation Form control.
   */
  public personForm = new FormGroup(
    {
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'ahorro': new FormControl('', [Validators.required]),
      'ahorroPercentage': new FormControl('', [Validators.required]),
      'enableNotify': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'birthdate': new FormControl('', [Validators.required]),
      'gender': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required]),
      'dateFormat': new FormControl('', [Validators.required]),
      'timeFormat': new FormControl('', [Validators.required]),
      'timeZone': new FormControl('', [Validators.required]),
      'languageCode': new FormControl('', [Validators.required])
    }
  );

  constructor(
    public dialog: MatDialog,
    private personasService: PersonasService,
    private route: ActivatedRoute) {
  }


  // Convenience getter for easy access to form fields.
  get form() { return this.personForm.controls; }

  /**
   * Esto es un formulario.
   */
  public formulario: Form;

  /**
   * Datos complementario de la vista.
   */
  public viewdata: PersonasFormularioViewData;

  /**
   * Datos para almacenar un bien.
   */
  public bienForm: Bien;

  ngOnInit() {
    this.initDefaultForm();
    this.buildViewData();

    this.subscription = this.route.params
      .subscribe(params => {
        const id = +params['id']; // (+) converts string 'id' to a number
        if (id) {
          this.initDataForm(id);
        }
      });
  }

  ngOnDestroy() {
    // Unsubscribe.
    this.subscription.unsubscribe();
  }

  /**
   * Filtra la accion ejecutada.
   */
  public action() {
    console.log(`${FormularioComponent.name}::action`);

    if (this.viewdata.editMode) {
      this.updatePerson();
    } else {
      this.addPerson();
    }
  }

  /**
   * Actualiza una persona.
   */
  public updatePerson() {
    console.log(`${FormularioComponent.name}::update %o`, this.formulario);
  }

  /**
   * Agraga una nueva persona.
   */
  public addPerson() {
    console.log(`${FormularioComponent.name}::update %o`, this.formulario);
  }

  /**
   * Retorna el listado de errores.
   */
  public getErrors(indicator: string): ValidationErrors {
    const res = this.personForm.get(`${indicator}`).errors;
    return res;
  }

  /**
   * Valida si esta precargado el error en el form.
   */
  public validateError(indicator) {
    const res = this.getErrors(`${indicator}`) !== null;
    return res;
  }

  public hasBienes() {
    return this.formulario.bienes !== null && this.formulario.bienes.length > 0;
  }

  /**
   * Abre formulario para agregar un nuevo bien.
   */
  public openDialog(): void {
    const methodName: string = `${FormularioComponent.name}::openDialog`;
    console.log(`${methodName}`);

    const dialogRef = this.dialog.open(BienComponent, {
      width: '500px',
      data: { bienForm: this.bienForm }
    });

    dialogRef.afterClosed()
      .subscribe(response => {
        console.log(`${methodName}::afterClosed selection %o`, response);
        this.bienForm = response;
      });
  }

  /**
   * Elimina el item correspondiente.
   */
  public deleteBien(id: string) {
    console.log(`${FormularioComponent.name}::deleteBien id: %o`, id);
  }

  /**
   * Inicializa el modelo.
   */
  private initDataForm(id) {

    this.personasService.getFormPersonaById$(id)
      .subscribe((response: Form) => {
        this.formulario = { ...response };
      });
  }

  /**
   * Inicializa el modelo.
   */
  private initDefaultForm() {
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
      regionalData: {
        dateFormat: '',
        languageCode: '',
        timeFormat: '',
        timeZone: null
      }
    };
  }

  /**
   * Construye el viewdata.
   */
  private buildViewData() {
    const id = +this.route.snapshot.paramMap.get('id');
    const editMode: boolean = id ? true : false;

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
      languageCodes: this.personasService.getLanguageCodes(),
      titleForm: editMode ? 'Edición de personas' : 'Crear persona',
      buttonActionText: editMode ? 'Actualizar' : 'Agregar',
      editMode: editMode
    };
  }
}
