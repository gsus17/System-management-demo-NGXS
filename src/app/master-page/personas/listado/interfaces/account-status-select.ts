import { AccountStatus } from 'src/api/entities/account-status.entity';

/**
 * Estructura base de account status.
 */
export interface AccountStatusSelect {
  keyTranslate: string;
  value: AccountStatus;
}
