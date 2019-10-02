import { Credentials } from '../entities/credentials.entity';

export class AuthStateModel {
  credentials: Credentials;
  user: any;
  form: any;
  showProgressLinear: boolean;
}
