import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasServiceSingleton } from '../personas.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from 'src/app/dialog-delete/dialog-delete.component';
import { AccountStatus } from 'src/api/entities/account-status.entity';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {

  public personList: Persona[] = [];

  public listToRender: Persona[] = [];

  public statusSelected = {
    keyTranslate: 'PERSON_LIST.STATUS_OPTION_ALL',
    value: null
  };

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

  public paginator: Paginator = null;

  private personasSubscription: Subscription = null;

  constructor(
    public snackBar: MatSnackBar,
    private personasService: PersonasServiceSingleton,
    private matPaginatorIntl: MatPaginatorIntl,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.paginator = {
      length: 10,
      pageSize: 5,
      pageIndex: 0,
      previousPageIndex: 0,
      pageSizeOptions: [5, 10, 15, 20, 25]
    };

    this.matPaginatorIntl.itemsPerPageLabel = 'Resultados por pagina.';
    this.getPersons(this.paginator.pageIndex, this.paginator.pageSize);
  }

  /**
   * Desuscribe todas las referencias a los observables.
   */
  public ngOnDestroy() {
    // Unsubscribe.
    this.personasSubscription.unsubscribe();
  }

  /**
   * Obtiene el listado de personas.
   */
  public getPersons(pageIndex: number, pageSize: number) {
    this.personasSubscription = this.personasService.getPersonList$(pageIndex, pageSize)
      .subscribe((listado: Persona[]) => {
        this.personList = listado;
        this.listToRender = listado;
      });
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
   * Filter the local list.
   */
  public filter(): void {
    if (this.statusSelected.value === null) {
      this.listToRender = this.personList;
    } else {
      this.listToRender = this.personList.filter((item) => item.estado === this.statusSelected.value);
    }
  }

  /**
   * Open the dialog to delete a person.
   */
  private openDeletePersonDialog(): Promise<any> {
    const methodName = `${ListadoComponent.name}::openImageNameDialog`;
    console.log(`${methodName}`);

    const promise = new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(DialogDeleteComponent, {
        data: { message: '¿Esta seguro que desea eliminar a esta persona?', response: false }
      });

      dialogRef.afterClosed()
        .subscribe(result => {
          console.log(`${methodName}::The dialog was closed`);
          if (result) {
            resolve();
          } else {
            reject();
          }
        });
    });

    return promise;
  }

  /**
   * Edit a concret person.
   */
  public deletePersona(id: number) {
    console.log(`${ListadoComponent.name}::deletePersona`);

    this.openDeletePersonDialog()
      .then(() => {
        this.personasService.deletePersonById(id)
          .then(() => {
            this.openSnackBar('Se ha eliminado correctamente.');
          })
          .catch(() => {
            this.openSnackBar('Ha ocurrido un error.');
          });
      })
      .catch(() => {
        //
      });
  }

  /**
   * Actualiza el listado por el cambio del paginador.
   */
  public changePaginator(change: Paginator) {
    console.log(`${ListadoComponent.name}::getPersons %o`, change);
    this.getPersons(change.pageIndex, change.pageSize);
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

/**
 * Estructura de datos del paginador.
 */
interface Paginator {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
  pageSizeOptions: number[];
}

/**
 * Estructura de datos del listado de status.
 */
interface StatusItem {
  keyTranslate: string;
  value: AccountStatus;
}
