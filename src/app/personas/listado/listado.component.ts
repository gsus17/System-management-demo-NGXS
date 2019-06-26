import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasServiceSingleton } from '../personas.service';
import { Subscription, interval } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig, MatPaginatorIntl } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {

  public personList: Persona[] = [];
  public paginator: Paginator = null;
  private personasSubscription: Subscription = null;

  constructor(
    public snackBar: MatSnackBar,
    private personasService: PersonasServiceSingleton,
    private matPaginatorIntl: MatPaginatorIntl,
    private router: Router) { }

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

  ngOnDestroy() {
    // Unsubscribe.
    this.personasSubscription.unsubscribe();
  }

  /**
   * Obtiene el listado de personas.
   */
  public getPersons(pageIndex: number, pageSize: number) {
    this.personasSubscription = this.personasService.getPersonas$(pageIndex, pageSize)
      .subscribe((listado: Persona[]) => {
        this.personList = listado;
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
   * Edit a concret person.
   */
  public deletePersona(id: string) {
    console.log(`${ListadoComponent.name}::deletePersona`);
    this.personasService.deletePersona(id)
      .then(() => {
        this.openSnackBar('Se ha eliminado correctamente.');
      })
      .catch(() => {
        this.openSnackBar('Ha ocurrido un error.');
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
