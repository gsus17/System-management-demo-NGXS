import { Component, OnInit, ViewChild } from '@angular/core';
import { PaisesService } from '../paises.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

let COLUMNS: Columns[] = [];

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['select', 'iata', 'nombre', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<Columns>(COLUMNS);
  public selection = new SelectionModel<Columns>(true, []);

  constructor(private paisesService: PaisesService) { }

  ngOnInit() {

    this.paisesService.getPaises$()
      .subscribe((data) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        COLUMNS = data.map((item) => {
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

/**
 * Estructura del listado de columnas.
 */
export interface Columns {
  iata: string;
  nombre: string;
  editar: string;
  eliminar: string;
}
