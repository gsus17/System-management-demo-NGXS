const FEATURE_KEY = '[Master Page]';

export class EnabledProgressLinearAction {

  static readonly type = `${FEATURE_KEY} Enable progress linear state`;
  constructor() { }
}

export class DisabledProgressLinearAction {

  static readonly type = `${FEATURE_KEY} Disable progress linear state`;
  constructor() { }
}
