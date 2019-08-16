import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { PersonasServiceSingleton } from '../personas.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { Form } from './interfaces/formulario';
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
import { Store, Select } from '@ngxs/store';
import { CreatePersona, UpdatePersona } from '../personas.actions';
import { LoadInitData } from './formulario.actions';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, OnDestroy {

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
   * Datos para almacenar un bien.
   */
  public countryForm: Pais;

  /**
   * Subscription reference List.
   */
  private subscriptionReferences: Subscription[] = [];


  @Select(state => state.personsForm.viewdata) viewdata$: Observable<PersonasFormularioViewData>;
  @Select(state => state.personsForm.formulario) formulario$: Observable<Form>;

  constructor(
    private store: Store,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public ngZone: NgZone,
    private personasService: PersonasServiceSingleton,
    private paisesService: PaisesServiceSingleton,
    private route: ActivatedRoute,
    private router: Router) {
  }

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
    this.loadInitData();
    this.initDefaultForm();
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

    if (this.formulario.editMode) {
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
    this.store.dispatch(new UpdatePersona(this.formulario))
      .toPromise()
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
    this.store.dispatch(new CreatePersona(this.formulario))
      .toPromise()
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
  private initDefaultForm() {
    const subscription: Subscription = this.formulario$.subscribe((response) => this.formulario = response);
    this.subscriptionReferences.push(subscription);
  }

  /**
   * Construye el viewdata.
   */
  private loadInitData() {
    console.log(`${FormularioComponent.name}::buildViewData`);

    const id = +this.route.snapshot.paramMap.get('id');
    const editMode: boolean = id ? true : false;
    this.store.dispatch(new LoadInitData(editMode, id));
  }
}
