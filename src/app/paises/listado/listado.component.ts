import { Component, OnInit, ViewChild } from '@angular/core';
import { PaisesServiceSingleton } from '../paises.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormularioCountryComponent } from '../formulario/formulario.component';
import { Pais } from 'src/api/entities/pais.entity';
import { CountryForm } from '../formulario/formulario.entity';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

const COLUMNS: Columns[] = [];

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Listado de columnas.
   */
  public displayedColumns: string[] = ['select', 'iata', 'nombre', 'editar', 'eliminar'];

  /**
   * Data a renderizar en las columnas.
   */
  public dataSource = new MatTableDataSource<Columns>(COLUMNS);

  /**
   * Listado de elementos seleccionados.
   */
  public selection = new SelectionModel<Columns>(true, []);

  /**
   * Datos para almacenar un bien.
   */
  public countryForm: Pais;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private paisesService: PaisesServiceSingleton,
    private db: AngularFirestore) { }

  ngOnInit() {

    this.getCountries();
  }

  /**
   * createId
   */
  public createId(): string {
    return this.db.createId();
  }

  /**
   * Devuelve el listado de personas.
   */
  public getCountries(): void {
    this.paisesService.getPaises$()
      .subscribe((data) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.data = data.map((item) => {
          return { select: '', id: item.id, iata: item.codigoIata, nombre: item.nombre, editar: '', eliminar: '' };
        });
      });
  }

  /**
   * Edita el pais.
   */
  public editCountry(name: string, iata: string, id: string) {
    const methodName: string = `${ListadoComponent.name}::editCountry`;
    console.log(`${methodName}`);

    this.openDialog(name, iata, id)
      .subscribe(response => {
        console.log(`${methodName}::afterClosed selection %o`, response);
        const country: Pais = {
          codigoIata: response.codigoIata,
          id: response.id,
          nombre: response.nombre
        };

        this.paisesService.editCountry(country)
          .then(() => {
            this.openSnackBar('Se ha editado correctamente.');
          })
          .catch(() => {
            this.openSnackBar('Ha ocurrido un error.');
          });
      });
  }

  /**
   * Aplica el filtro ingresado.
   */
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        const country: Pais = {
          codigoIata: response.codigoIata,
          id: this.createId(),
          nombre: response.nombre
        };

        this.paisesService.createContry(country)
          .then(() => {
            this.openSnackBar('Se ha creado correctamente.');
          })
          .catch(() => {
            this.openSnackBar('Ha ocurrido un error.');
          });
      });
  }

  /**
   * Agrega un pais.
   */
  public deleteCountry(id: number) {
    const methodName: string = `${ListadoComponent.name}::deleteCountry`;
    console.log(`${methodName}`);

    this.paisesService.deleteCountry(id)
      .then(() => {
        this.openSnackBar('Se ha eliminado correctamente.');
      })
      .catch(() => {
        this.openSnackBar('Ha ocurrido un error.');
      });
  }

  /**
   * Abre formulario para agregar un nuevo bien.
   */
  public openDialog(name: string = '', iata: string = '', id: string = '0'): Observable<any> {
    const methodName: string = `${ListadoComponent.name}::openDialog`;
    console.log(`${methodName}`);
    const countryForm: CountryForm = name !== '' && iata !== '' ?
      { modify: true, ...this.countryForm, nombre: name, codigoIata: iata, id: id }
      : { modify: false, ...this.countryForm };

    const dialogRef = this.dialog.open(FormularioCountryComponent, {
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
 * Estructura del listado de columnas.
 */
export interface Columns {
  iata: string;
  nombre: string;
  editar: string;
  eliminar: string;
}
