import { Component, OnInit, OnDestroy } from '@angular/core';
import { Persona } from 'src/api/entities/persona.entity';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from 'src/app/dialog-delete/dialog-delete.component';
import { Store, Select } from '@ngxs/store';
import {
  PersonasGetAction,
  PersonaDeleteAction,
  PersonaSetPaginatorAction,
  PersonaSetAccountStatusSelectedAction
} from '../store/personas.actions';
import { StatusItem } from './entities/status-item.entity';
import { Paginator } from './entities/paginator.entity';
import { AccountStatusSelect } from './entities/account-status-select.entity';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class PersonasListadoComponent implements OnInit, OnDestroy {

  public statusSelected: AccountStatusSelect;

  private subscriptionReference: Subscription = null;
  @Select(state => state.persons.personList) persons$: Observable<Persona[]>;
  @Select(state => state.persons.paginator) paginator$: Observable<Paginator>;
  @Select(state => state.persons.statusSelected) statusSelected$: Observable<AccountStatusSelect>;
  @Select(state => state.persons.statusList) statusList$: Observable<StatusItem[]>;

  constructor(
    private store: Store,
    public snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog) { }

  /**
   * Inicializacion del componente.
   */
  public ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Resultados por pagina.';
    this.getPersons();
    this.subscriptionReference = this.statusSelected$
      .subscribe((resp) => {
        this.statusSelected = resp;
      });
  }

  /**
   * Elimina la referencia a la subscripcion.
   */
  public ngOnDestroy() {
    this.subscriptionReference.unsubscribe();
  }

  /**
   * Obtiene el listado de personas.
   */
  public getPersons() {
    console.log(`${PersonasListadoComponent.name}::getPersons`);
    this.store.dispatch(new PersonasGetAction());
  }

  /**
   * Filter the local list.
   */
  public filter(): void {
    console.log(`${PersonasListadoComponent.name}::filter`);
    this.store.dispatch(new PersonaSetAccountStatusSelectedAction(this.statusSelected));
  }

  /**
   * Actualiza el listado por el cambio del paginador.
   */
  public changePaginator(change: Paginator) {
    console.log(`${PersonasListadoComponent.name}::getPersons %o`, change);
    this.store.dispatch(new PersonaSetPaginatorAction({ pageIndex: change.pageIndex, pageSize: change.pageSize }));
  }

  /**
   * Add a new person.
   */
  public addPerson() {
    console.log(`${PersonasListadoComponent.name}::addPerson`);
    this.store.dispatch(new Navigate(['master-page/personas/add']));
  }

  /**
   * Edit a concret person.
   */
  public editPerson(id: string) {
    console.log(`${PersonasListadoComponent.name}::editPerson`);
    this.store.dispatch(new Navigate([`master-page/personas/formulario/${id}`]));
  }

  /**
   * Open the dialog to delete a person.
   */
  private openDeletePersonDialog(): Promise<any> {
    const methodName = `${PersonasListadoComponent.name}::openImageNameDialog`;
    console.log(`${methodName}`);
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { message: '¿Esta seguro que desea eliminar a esta persona?', response: false }
    });

    return dialogRef.afterClosed()
      .toPromise();
  }

  /**
   * Edit a concret person.
   */
  public deletePersona(id: number) {
    console.log(`${PersonasListadoComponent.name}::deletePersona`);
    this.openDeletePersonDialog()
      .then((result) => {
        if (result) {
          this.store.dispatch(new PersonaDeleteAction(id)).toPromise()
            .then(() => {
              this.openSnackBar('Se ha eliminado correctamente.');
            })
            .catch(() => {
              this.openSnackBar('Ha ocurrido un error.');
            });
        }
      });
  }

  /**
   * Renderiza el componente toast mostrando el mensaje correspondiente.
   */
  public openSnackBar(msg: string) {
    const config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    };

    this.snackBar.open(msg, null, config);
  }
}
