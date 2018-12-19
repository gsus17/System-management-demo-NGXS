import { Component, OnInit, ViewChild } from '@angular/core';
import { PaisesService } from '../paises.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { FormularioComponent } from '../formulario/formulario.component';
import { Pais } from 'src/api/entities/pais.entity';
import { CountryForm } from '../formulario/formulario.entity';
import { Observable } from 'rxjs';

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

  /**
   * Datos para almacenar un bien.
   */
  public countryForm: Pais;

  constructor(
    public dialog: MatDialog,
    private paisesService: PaisesService) { }

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
   * Edita el pais.
   */
  public editCountry(name: string, iata: string) {
    const methodName: string = `${ListadoComponent.name}::editCountry`;
    console.log(`${methodName}`);

    this.openDialog(name, iata)
      .subscribe(response => {
        console.log(`${methodName}::afterClosed selection %o`, response);
      });
  }

  /**
   * Agrega un pais.
   */
  public addCountry() {
    const methodName: string = `${ListadoComponent.name}::addCountry`;
    console.log(`${methodName}`);

    this.openDialog()
      .subscribe(response => {
        console.log(`${methodName}::afterClosed selection %o`, response);
      });
  }

  /**
   * Abre formulario para agregar un nuevo bien.
   */
  public openDialog(name: string = '', iata: string = ''): Observable<any> {
    const methodName: string = `${ListadoComponent.name}::openDialog`;
    console.log(`${methodName}`);
    const countryForm: CountryForm = name !== '' && iata !== '' ?
      { modify: true, ...this.countryForm, nombre: name, codigoIata: iata }
      : { modify: false, ...this.countryForm };

    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '500px',
      data: countryForm
    });

    return dialogRef.afterClosed();

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
