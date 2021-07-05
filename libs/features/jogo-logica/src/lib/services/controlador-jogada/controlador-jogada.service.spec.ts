import { TestBed } from '@angular/core/testing';

import { ControladorJogadaService } from './controlador-jogada.service';

describe('ControladorJogadaService', () => {
  let service: ControladorJogadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControladorJogadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
