const FEATURE_KEY = '[Master Page]';

export class MasterPageEnabledProgressLinearAction {
  static readonly type = `${FEATURE_KEY} Enable progress linear state`;
  constructor() { }
}

export class MasterPageDisabledProgressLinearAction {
  static readonly type = `${FEATURE_KEY} Disable progress linear state`;
  constructor() { }
}
