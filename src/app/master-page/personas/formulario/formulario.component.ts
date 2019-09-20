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
import { Pais } from 'src/api/entities/pais.entity';
import { Store, Select } from '@ngxs/store';
import { CreatePersona, UpdatePersona } from '../personas.actions';
import { LoadInitData } from './formulario.actions';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class PersonasFormularioComponent implements OnInit, OnDestroy {

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
      'dateFormats': new FormControl('', [Validators.required]),
      'timeFormats': new FormControl('', [Validators.required]),
      'timeZones': new FormControl('', [Validators.required]),
      'languageCodes': new FormControl('', [Validators.required]),
      'nacionalidad': new FormControl('', [Validators.required]),
      'obs': new FormControl('', [Validators.required])
    }
  );

  /**
   * Formulario.
   */
  public formulario: Form;

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
    private personasService: PersonasServiceSingleton,
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
    console.log(`${PersonasFormularioComponent.name}::action`);

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
    console.log(`${PersonasFormularioComponent.name}::update %o`, this.formulario);
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
    console.log(`${PersonasFormularioComponent.name}::update %o`, this.formulario);
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
  public openPropertiesDialog(): void {
    console.log(`${PersonasFormularioComponent.name}::openPropertiesDialog`);

    const dialogRef = this.dialog.open(BienComponent, { width: '500px', data: { bienForm: this.bienForm } });
    dialogRef.afterClosed()
      .toPromise()
      .then((response) => {
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
   * Redirecciona a la vista de listado de personas.
   */
  public goToPersonList() {
    console.log(`${PersonasFormularioComponent.name}::goToPersonList`);
    this.router.navigate([`/master-page/personas/listado`]);
  }

  /**
   * Elimina el item correspondiente.
   */
  public deleteProperty($index: number) {
    console.log(`${PersonasFormularioComponent.name}::deleteProperty`);
    this.formulario.bienes.splice($index, 1);
    this.openSnackBar('Se ha eliminado correctamente.');
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
   * Construye el viewdata.
   */
  private loadInitData() {
    console.log(`${PersonasFormularioComponent.name}::buildViewData`);

    const id = +this.route.snapshot.paramMap.get('id');
    const editMode: boolean = id ? true : false;
    this.store.dispatch(new LoadInitData(editMode, id));
  }

  /**
   * Inicializa el modelo.
   */
  private initDefaultForm() {
    const subscription: Subscription = this.formulario$.subscribe((response) => {

      this.personForm.setValue({
        name: response.name,
        email: response.email,
        ahorro: response.ahorro,
        ahorroPercentage: response,
        enableNotify: response.enableNotify,
        address: response.address,
        birthdate: response.birthdate,
        gender: response.gender,
        status: response.status,
        dateFormats: response.regionalData.dateFormat,
        timeFormats: response.regionalData.timeFormat,
        timeZones: response.regionalData.timeZone,
        languageCodes: response.regionalData.languageCode,
        nacionalidad: response.nacionalidad,
        obs: response.obs,
      });

      this.formulario = response;
    });
    this.subscriptionReferences.push(subscription);
  }
}
