import { TestBed } from '@angular/core/testing';

import { PersonasServiceSingleton } from './personas.service';

describe('PersonasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonasServiceSingleton = TestBed.get(PersonasServiceSingleton);
    expect(service).toBeTruthy();
  });
});
