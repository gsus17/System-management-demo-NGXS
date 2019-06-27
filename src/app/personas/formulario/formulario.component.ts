import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasServiceSingleton } from '../personas.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { Form } from './formulario';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BienComponent } from './bien/bien.component';
import { Bien } from 'src/api/entities/bien.entity';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PaisesServiceSingleton } from 'src/app/paises/paises.service';
import { Pais } from 'src/api/entities/pais.entity';
import { CountryForm } from 'src/app/paises/formulario/formulario.entity';
import { FormularioCountryComponent } from 'src/app/paises/formulario/formulario.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, OnDestroy {

  /**
   * Subscription reference.
   */
  private subscriptionRouteParams: Subscription;

  /**
   * Subscription reference.
   */
  private subscriptionGetPaises: Subscription;

  /**
   * Subscription reference.
   */
  private subscriptionGetFormPersonaById: Subscription;

  /**
   * Subscription reference List.
   */
  private subscriptionReferences: Subscription[] = [];

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

  /**
   * Datos para almacenar un bien.
   */
  public countryForm: Pais;

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
   * Formulario.
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

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
    this.initDefaultForm();
    this.buildViewData();

    this.subscriptionRouteParams = this.route.params
      .subscribe(params => {
        const id = +params['id']; // (+) converts string 'id' to a number
        if (id) {
          this.initDataForm(id);
        }
      });

    this.subscriptionReferences.push(this.subscriptionRouteParams);
  }

  /**
   * Desuscribe las referencias a los observables.
   */
  public ngOnDestroy() {
    // Unsubscribe.
    this.subscriptionReferences
      .forEach((subs) => {
        subs.unsubscribe();
      });
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

    const dialogRef = this.dialog.open(
      BienComponent,
      {
        width: '500px',
        data: { bienForm: this.bienForm }
      });

    dialogRef.afterClosed()
      .subscribe(response => {
        console.log(`${methodName}::afterClosed selection %o`, response);
        if (response) {
          this.bienForm = {
            ...response,
            id: this.personasService.generateUUIDToPersonProperty()
          };

          this.formulario.bienes.push(this.bienForm);
        }
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
   * Abre formulario para agregar un nuevo bien.
   */
  public openCountryDialog(name: string = '', iata: string = '', id: string = '0'): Observable<any> {
    const methodName: string = `${FormularioComponent.name}::openCountryDialog`;
    console.log(`${methodName}`);
    const countryForm: CountryForm = name !== '' && iata !== '' ?
      { modify: true, ...this.countryForm, nombre: name, codigoIata: iata, id: id }
      : { modify: false, ...this.countryForm };

    const dialogRef = this.dialog.open(FormularioCountryComponent, {
      width: '500px',
      data: countryForm
    });

    return dialogRef.afterClosed();
  }

  /**
   * createId
   */
  public createId(): string {
    return this.paisesService.createId();
  }

  /**
   * Agrega un pais.
   */
  public addCountry() {
    const methodName: string = `${FormularioComponent.name}::addCountry`;
    console.log(`${methodName}`);

    this.openCountryDialog()
      .subscribe(response => {
        console.log(`${methodName}::afterClosed selection %o`, response);
        const country: Pais = {
          codigoIata: response.codigoIata,
          id: this.createId(),
          nombre: response.nombre
        };

        this.paisesService.createContry(country)
          .then(() => {
            this.openSnackBar('Se ha creado correctamente.');
          })
          .catch(() => {
            this.openSnackBar('Ha ocurrido un error.');
          });
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
  private initDataForm(id) {
    this.subscriptionGetFormPersonaById = this.personasService.getFormPersonaById$(id)
      .subscribe((response: Form) => {
        this.formulario = { ...response };
      });

    this.subscriptionReferences.push(this.subscriptionGetFormPersonaById);
  }

  /**
   * Inicializa el modelo.
   */
  private initDefaultForm() {
    this.formulario = {
      id: null,
      address: '',
      obs: '',
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

    this.subscriptionGetPaises = this.paisesService.getPaises$()
      .subscribe((countries: Pais[]) => {
        this.viewdata.countries = countries;
      });

    this.subscriptionReferences.push(this.subscriptionGetPaises);
  }
}
