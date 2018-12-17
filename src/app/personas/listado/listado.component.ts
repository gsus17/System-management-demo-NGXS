import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasService } from '../personas.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit, OnDestroy {

  public personList: Persona[] = [];
  public length = 100;
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  private personasSubscription: Subscription = null;

  constructor(
    private personasService: PersonasService,
    private router: Router) { }

  ngOnInit() {

    this.personasSubscription = this.personasService.getPersonas$()
      .subscribe((listado: Persona[]) => {
        this.personList = listado;
      });
  }

  ngOnDestroy() {
    // Unsubscribe.
    this.personasSubscription.unsubscribe();
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
}
