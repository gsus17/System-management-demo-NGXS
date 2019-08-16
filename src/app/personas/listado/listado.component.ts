import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/api/entities/persona.entity';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from 'src/app/dialog-delete/dialog-delete.component';
import { AccountStatus } from 'src/api/entities/account-status.entity';
import { Store, Select } from '@ngxs/store';
import { GetPersonas, DeletePersona, SetPaginator, SetAccountStatusSelected } from '../personas.actions';
import { StatusItem } from './interfaces/status-item';
import { Paginator } from './interfaces/paginator';
import { AccountStatusSelect } from './interfaces/account-status-select';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  public statusSelected: AccountStatusSelect;

  public statusList: StatusItem[] = [
    {
      keyTranslate: 'PERSON_LIST.STATUS_OPTION_ALL',
      value: null
    },
    {
      keyTranslate: 'PERSON_LIST.STATUS_OPTION_ACTIVE',
      value: AccountStatus.active
    },
    {
      keyTranslate: 'PERSON_LIST.STATUS_OPTION_INACTIVE',
      value: AccountStatus.inactive
    },
    {
      keyTranslate: 'PERSON_LIST.STATUS_OPTION_SUSPENDED',
      value: AccountStatus.suspended
    }
  ];

  @Select(state => state.persons.personList) persons$: Observable<Persona[]>;
  @Select(state => state.persons.paginator) paginator$: Observable<Paginator>;
  @Select(state => state.persons.statusSelected) statusSelected$: Observable<AccountStatusSelect>;

  constructor(
    private store: Store,
    public snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Resultados por pagina.';
    this.getPersons();
    this.statusSelected$
      .subscribe((resp) => {
        this.statusSelected = resp;
      });
  }

  /**
   * Obtiene el listado de personas.
   */
  public getPersons() {
    console.log(`${ListadoComponent.name}::getPersons`);
    this.store.dispatch(new GetPersonas());
  }

  /**
   * Filter the local list.
   */
  public filter(): void {
    console.log(`${ListadoComponent.name}::filter`);
    this.store.dispatch(new SetAccountStatusSelected(this.statusSelected));
  }

  /**
   * Actualiza el listado por el cambio del paginador.
   */
  public changePaginator(change: Paginator) {
    console.log(`${ListadoComponent.name}::getPersons %o`, change);
    this.store.dispatch(new SetPaginator({ pageIndex: change.pageIndex, pageSize: change.pageSize }));
  }

  /**
   * Add a new person.
   */
  public addPerson() {
    console.log(`${ListadoComponent.name}::addPerson`);
    this.router.navigate(['/master-page/personas/add']);
  }

  /**
   * Edit a concret person.
   */
  public editPerson(id: string) {
    console.log(`${ListadoComponent.name}::editPerson`);
    this.router.navigate([`/master-page/personas/formulario/${id}`]);
  }

  /**
   * Open the dialog to delete a person.
   */
  private openDeletePersonDialog(): Promise<any> {
    const methodName = `${ListadoComponent.name}::openImageNameDialog`;
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
    console.log(`${ListadoComponent.name}::deletePersona`);
    this.openDeletePersonDialog()
      .then((result) => {
        if (result) {
          this.store.dispatch(new DeletePersona(id)).toPromise()
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
