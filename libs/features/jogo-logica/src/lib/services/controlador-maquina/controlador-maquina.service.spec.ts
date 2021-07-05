import { TestBed } from '@angular/core/testing';

import { ControladorMaquinaService } from './controlador-maquina.service';

describe('ControladorMaquinaService', () => {
  let service: ControladorMaquinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControladorMaquinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
