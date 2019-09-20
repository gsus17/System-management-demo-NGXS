import { AccountStatus } from 'src/api/entities/account-status.entity';

/**
 * Estructura de datos del listado de status.
 */
export interface StatusItem {
  keyTranslate: string;
  value: AccountStatus;
}
