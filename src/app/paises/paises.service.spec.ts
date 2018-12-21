import { TestBed } from '@angular/core/testing';

import { PaisesServiceSingleton } from './paises.service';

describe('PaisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaisesServiceSingleton = TestBed.get(PaisesServiceSingleton);
    expect(service).toBeTruthy();
  });
});
