import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasServiceSingleton } from '../personas.service';
import { PersonasFormularioViewData } from './formulario.viewdata';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BienComponent } from './bien/bien.component';
import { Bien } from 'src/api/entities/bien.entity';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store, Select } from '@ngxs/store';
import {
  PersonasCreateAction,
  PersonasUpdateAction,
  PersonaFormActivateEditModeAction,
  PersonaFormActivateAddModeAction,
  PersonaFormSetPersonIdAction,
  PersonaFormSetBienesdAction,
  PersonaFormDeleteBiendAction,
  PersonaFormResetdAction
} from '../store/personas.actions';
import { Navigate } from '@ngxs/router-plugin';
import { PersonasState } from '../store/personas.state';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class PersonasFormularioComponent implements OnInit, OnDestroy {

  /**
   * Validation Form control.
   */
  public form = new FormGroup(
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
   * Datos para almacenar un bien.
   */
  public bienForm: Bien;

  @Select(state => state.persons.viewdata) viewdata$: Observable<PersonasFormularioViewData>;
  @Select(state => state.persons.bienes) bienes$: Observable<Bien[]>;

  constructor(
    private store: Store,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private personasService: PersonasServiceSingleton,
    private route: ActivatedRoute) { }

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
    this.loadInitData();
  }
  public ngOnDestroy() {
    this.store.dispatch(new PersonaFormResetdAction());
  }

  /**
   * Filtra la accion ejecutada.
   */
  public action() {
    console.log(`${PersonasFormularioComponent.name}::action`);
    const editMode: boolean = this.store.selectSnapshot(PersonasState.editMode);

    if (editMode) {
      this.updatePerson();
    } else {
      this.addPerson();
    }
  }

  /**
   * Actualiza una persona.
   */
  public updatePerson() {
    console.log(`${PersonasFormularioComponent.name}::update %o`, this.form);
    this.store.dispatch(new PersonasUpdateAction())
      .toPromise()
      .then(() => {
        this.openSnackBar('Se ha actualizado la persona correctamente.');
        this.store.dispatch(new Navigate(['/master-page/personas/listado']));
      })
      .catch(() => {
        this.openSnackBar('Ha ocurrido un error.');
      });
  }

  /**
   * Agraga una nueva persona.
   */
  public addPerson() {
    console.log(`${PersonasFormularioComponent.name}::update %o`, this.form);
    this.store.dispatch(new PersonasCreateAction())
      .toPromise()
      .then(() => {
        this.openSnackBar('Se ha creado la persona correctamente.');
        this.store.dispatch(new Navigate(['/master-page/personas/listado']));
      })
      .catch(() => {
        this.openSnackBar('Ha ocurrido un error.');
      });
  }

  /**
   * Retorna el listado de errores.
   */
  public getErrors(indicator: string): ValidationErrors {
    const res = this.form.get(`${indicator}`).errors;
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

          this.store.dispatch(new PersonaFormSetBienesdAction(this.bienForm));
        }
      });
  }

  /**
   * Redirecciona a la vista de listado de personas.
   */
  public goToPersonList() {
    console.log(`${PersonasFormularioComponent.name}::goToPersonList`);
    this.store.dispatch(new Navigate(['/master-page/personas/listado']));
  }

  /**
   * Elimina el item correspondiente.
   */
  public deleteProperty($index: number) {
    console.log(`${PersonasFormularioComponent.name}::deleteProperty`);
    this.store.dispatch(new PersonaFormDeleteBiendAction($index));
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
    console.log(`${PersonasFormularioComponent.name}::loadInitData`);

    const id = +this.route.snapshot.paramMap.get('id');
    const editMode: boolean = id ? true : false;

    if (editMode) {
      this.store.dispatch([new PersonaFormSetPersonIdAction(id), new PersonaFormActivateEditModeAction()]);
    } else {
      this.store.dispatch(new PersonaFormActivateAddModeAction());
    }
  }
}
