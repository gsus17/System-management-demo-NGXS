import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../paises.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

let ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {

  public displayedColumns: string[] = ['select', 'position', 'iata', 'nombre', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private paisesService: PaisesService) { }

  ngOnInit() {

    this.paisesService.getPaises$()
      .subscribe((data) => {
        ELEMENT_DATA = data.map((item) => {
          return { select: '', position: 1, iata: item.codigoIata, nombre: item.nombre, editar: '', eliminar: '' };
        });
      });
  }

  /**
   * Evalua si todos los elementos estan seleccionados.
   */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selecciona todas las filas si no están todas seleccionadas, de lo contrario, la selección clara.
   */
  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

export interface PeriodicElement {
  position: number;
  iata: string;
  nombre: string;
  editar: string;
  eliminar: string;
}
