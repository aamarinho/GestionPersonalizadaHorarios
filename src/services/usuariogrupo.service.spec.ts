import { TestBed } from '@angular/core/testing';

import { UsuariogrupoService } from './usuariogrupo.service';

describe('UsuariogrupoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariogrupoService = TestBed.get(UsuariogrupoService);
    expect(service).toBeTruthy();
  });
});
