const FEATURE_KEY: string = '[Auth]';

export class AuthLoginAction {
  static readonly type = `${FEATURE_KEY} Login`;
  constructor() { }
}
export class AuthLoginSuccessAction {
  static readonly type = `${FEATURE_KEY} Login Success`;
  constructor() { }
}

export class AuthLoginErrorAction {
  static readonly type = `${FEATURE_KEY} Login Error`;
  constructor(public error) { }
}

export class AuthLogoutAction {
  static readonly type = `${FEATURE_KEY} Logout`;
}

export class AuthEnabledProgressLinearAction {
  static readonly type = `${FEATURE_KEY} Enable progress linear state`;
  constructor() { }
}

export class AuthDisabledProgressLinearAction {
  static readonly type = `${FEATURE_KEY} Disable progress linear state`;
  constructor() { }
}
