import { Pais } from 'src/api/entities/pais.entity';
import { Columns } from '../listado/listado.component';
import { MatTableDataSource } from '@angular/material/table';

export interface PaisesStateModel {
  countries: Pais[];
  dataSource: MatTableDataSource<Columns>;
}
