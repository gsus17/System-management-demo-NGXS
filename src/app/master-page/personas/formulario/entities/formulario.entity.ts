import { Sexo } from 'src/api/entities/sexo.entity';
import { AccountStatus } from 'src/api/entities/account-status.entity';
import { RegionalData } from 'src/api/entities/regional-data.entity';
import { Bien } from 'src/api/entities/bien.entity';
import { Pais } from 'src/api/entities/pais.entity';

/**
 * Interfaz correspondiente a un formulario.
 */
export interface Form {
  id: number;
  name?: string;
  email?: string;
  ahorro?: number;
  ahorroPercentage?: number;
  enableNotify?: boolean;
  address?: string;
  birthdate?: Date;
  gender?: Sexo;
  status?: AccountStatus;
  regionalData?: RegionalData;
  bienes?: Bien[];
  nacionalidad: Pais;
  obs?: string;
}
