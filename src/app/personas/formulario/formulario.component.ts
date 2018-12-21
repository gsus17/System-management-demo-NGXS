import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasServiceSingleton } from '../personas.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { Form } from './formulario';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BienComponent } from './bien/bien.component';
import { Bien } from 'src/api/entities/bien.entity';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PaisesServiceSingleton } from 'src/app/paises/paises.service';
import { Pais } from 'src/api/entities/pais.entity';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass']
})
export class FormularioComponent implements OnInit, OnDestroy {

  /**
   * subscription reference.
   */
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
      'languageCode': new FormControl('', [Validators.required]),
      'nacionalidad': new FormControl('', [Validators.required]),
      'obs': new FormControl('', [Validators.required])
    }
  );

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private personasService: PersonasServiceSingleton,
    private paisesService: PaisesServiceSingleton,
    private route: ActivatedRoute,
    private router: Router) {
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
    this.personasService.updatePerson(this.formulario)
      .then(() => {
        this.openSnackBar('Se ha actualizado la persona correctamente.');
        this.router.navigate(['master-page/personas/listado']);
      })
      .catch(() => {
        this.openSnackBar('Ha ocurrido un error.');
      });
  }

  /**
   * Agraga una nueva persona.
   */
  public addPerson() {
    console.log(`${FormularioComponent.name}::update %o`, this.formulario);
    this.personasService.addPerson(this.formulario)
      .then(() => {
        this.openSnackBar('Se ha creado la persona correctamente.');
        this.router.navigate(['master-page/personas/listado']);
      })
      .catch(() => {
        this.openSnackBar('Ha ocurrido un error.');
      });
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

  /**
   * Determina si existen bienes relacionados.
   */
  public hasBienes() {
    return this.formulario !== null
      && this.formulario.bienes !== null
      && this.formulario.bienes !== undefined
      && this.formulario.bienes.length > 0;
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
        this.bienForm = {
          ...response,
          id: this.personasService.generateUUID()
        };
        this.formulario.bienes.push(this.bienForm);
      });
  }

  /**
   * Cancela la operacion.
   */
  public cancel() {
    console.log(`${FormularioComponent.name}::cancel`);
    this.router.navigate([`/master-page/personas/listado`]);
  }

  /**
   * Elimina el item correspondiente.
   */
  public deleteBien($index: number) {
    console.log(`${FormularioComponent.name}::deleteBien`);
    this.formulario.bienes.splice($index, 1);

    this.openSnackBar('Se ha eliminado correctamente.');
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
   * Muestra el mensaje correspondiente.
   */
  public openSnackBar(msg: string) {
    const config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    };

    this.snackBar.open(msg, null, config);
  }

  /**
   * Inicializa el modelo.
   */
  private initDefaultForm() {
    this.formulario = {
      id: null,
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
      nacionalidad: '',
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
      editMode: editMode,
      countries: []
    };

    this.paisesService.getPaises$()
      .subscribe((countries: Pais[]) => {
        this.viewdata.countries = countries;
      });
  }
}
