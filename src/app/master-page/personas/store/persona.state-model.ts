import { Paginator } from '../listado/entities/paginator.entity';
import { AccountStatusSelect } from '../listado/entities/account-status-select.entity';
import { StatusItem } from '../listado/entities/status-item.entity';
import { PersonasFormularioViewData } from '../formulario/formulario.viewdata';
import { Persona } from 'src/api/entities/persona.entity';
import { Bien } from 'src/api/entities/bien.entity';

export interface PersonStateModel {
  personList: Persona[];
  paginator: Paginator;
  statusSelected: AccountStatusSelect;
  statusList: StatusItem[];
  viewdata: PersonasFormularioViewData;
  form: any;
  masterPageSubHeader: string;
  editMode: boolean;
  idToSearch: number;
  bienes: Bien[];
}
