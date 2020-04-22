import { TestBed } from '@angular/core/testing';

import { UsuarioasignaturaService } from './usuarioasignatura.service';

describe('UsuarioasignaturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioasignaturaService = TestBed.get(UsuarioasignaturaService);
    expect(service).toBeTruthy();
  });
});
