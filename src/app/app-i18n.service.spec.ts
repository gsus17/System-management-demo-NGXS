import { TestBed } from '@angular/core/testing';

import { AppI18nService } from './app-i18n.service';

describe('AppI18nService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppI18nService = TestBed.get(AppI18nService);
    expect(service).toBeTruthy();
  });
});
