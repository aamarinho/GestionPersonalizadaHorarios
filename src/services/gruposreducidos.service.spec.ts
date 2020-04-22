import { TestBed } from '@angular/core/testing';

import { GruposreducidosService } from './gruposreducidos.service';

describe('GruposreducidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GruposreducidosService = TestBed.get(GruposreducidosService);
    expect(service).toBeTruthy();
  });
});
