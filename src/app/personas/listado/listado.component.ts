import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {

  public length = 100;
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private router: Router) { }

  ngOnInit() {
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
    console.log(`${ListadoComponent.name}::addPerson`);
    this.router.navigate([`/master-page/personas/formulario/${id}`]);
  }

}
