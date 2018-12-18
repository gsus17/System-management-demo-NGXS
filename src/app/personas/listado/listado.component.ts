import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasService } from '../personas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit, OnDestroy {

  public personList: Persona[] = [];
  public paginator: Paginator = null;
  private personasSubscription: Subscription = null;

  constructor(
    private personasService: PersonasService,
    private router: Router) { }

  ngOnInit() {

    this.paginator = {
      length: 20,
      pageSize: 10,
      pageIndex: 1,
      previousPageIndex: 0,
      pageSizeOptions: [1, 5, 10, 15, 20, 25]
    };

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
        alert('Eliminada');
      })
      .catch(() => {
        alert('Error');
      });
  }

  /**
   * Actualiza el listado por el cambio del paginador.
   */
  public changePaginator(change: Paginator) {
    console.log(`${ListadoComponent.name}::getPersons %o`, change);

    this.getPersons(change.pageIndex, change.pageSize);
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
