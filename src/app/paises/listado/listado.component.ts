import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormularioCountryComponent } from '../formulario/formulario.component';
import { Pais } from 'src/api/entities/pais.entity';
import { CountryForm } from '../formulario/formulario.entity';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DialogDeleteComponent } from 'src/app/dialog-delete/dialog-delete.component';
import { Store, Select } from '@ngxs/store';
import { GetCountries, UpdateCountry, CreateCountry, DeleteCountry } from '../paises.actions';

const COLUMNS: Columns[] = [];

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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

  /**
   * Subscription reference.
   */
  private subscriptionPaisesService: Subscription;
  @Select(state => state.country.countries) countries$: Observable<Pais[]>;
  @Select(state => state.country.dataSource) dataSource$: Observable<MatTableDataSource<Columns>>;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private store: Store,
    private db: AngularFirestore) { }

  /**
   * Inicializa el componente.
   */
  public ngOnInit() {
    this.getCountries();
  }

  /**
   * Desuscribe las referencias a los observables.
   */
  public ngOnDestroy() {
    this.subscriptionPaisesService.unsubscribe();
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
    this.store.dispatch(new GetCountries());

    this.subscriptionPaisesService = this.countries$
      .subscribe((data) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.data = data.map((item) => {
          return { select: '', id: item.id, iata: item.codigoIata, nombre: item.nombre, editar: '', eliminar: '' };
        });
      });
  }

  /**
   * Agrega un pais.
   */
  public addCountry() {
    const methodName: string = `${ListadoComponent.name}::addCountry`;
    console.log(`${methodName}`);

    this.openDialog()
      .then((response) => {
        if (response) {
          const country: Pais = {
            codigoIata: response.codigoIata,
            id: this.createId(),
            nombre: response.nombre
          };

          this.store.dispatch(new CreateCountry(country))
            .toPromise()
            .then(() => {
              this.openSnackBar('Se ha creado correctamente.');
            })
            .catch(() => {
              this.openSnackBar('Ha ocurrido un error.');
            });
        }
      });
  }

  /**
   * Edita el pais.
   */
  public editCountry(name: string, iata: string, id: string) {
    const methodName: string = `${ListadoComponent.name}::editCountry`;
    console.log(`${methodName}`);

    this.openDialog(name, iata, id)
      .then((response) => {
        if (response) {
          const country: Pais = {
            codigoIata: response.codigoIata,
            id: response.id,
            nombre: response.nombre
          };

          this.store.dispatch(new UpdateCountry(country));
        }
      });
  }

  /**
   * Agrega un pais.
   */
  public deleteCountry(id: number) {
    const methodName: string = `${ListadoComponent.name}::deleteCountry`;
    console.log(`${methodName}`);

    this.openDeletePersonDialog()
      .then((result) => {
        if (result) {
          this.store.dispatch(new DeleteCountry(id))
            .toPromise()
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
   * Aplica el filtro ingresado.
   */
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Abre formulario para agregar un nuevo bien.
   */
  public openDialog(name: string = '', iata: string = '', id: string = '0'): Promise<any> {
    const methodName: string = `${ListadoComponent.name}::openDialog`;
    console.log(`${methodName}`);

    const countryForm: CountryForm = name !== '' && iata !== '' ?
      { modify: true, ...this.countryForm, nombre: name, codigoIata: iata, id: id }
      : { modify: false, ...this.countryForm };

    const dialogRef = this.dialog.open(
      FormularioCountryComponent, {
        width: '500px',
        data: countryForm
      });

    return dialogRef.afterClosed().toPromise();
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

  /**
   * Open the dialog to delete a country.
   */
  private openDeletePersonDialog(): Promise<any> {
    const methodName = `${ListadoComponent.name}::openImageNameDialog`;
    console.log(`${methodName}`);
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { message: 'COUNTRY.DELETE_DIALOG_MESSAGE', response: false }
    });

    return dialogRef.afterClosed().toPromise();
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
