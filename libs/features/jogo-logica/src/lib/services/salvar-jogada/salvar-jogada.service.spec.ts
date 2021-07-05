import { TestBed } from '@angular/core/testing';

import { SalvarJogadaService } from './salvar-jogada.service';

describe('SalvarJogadaService', () => {
  let service: SalvarJogadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarJogadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
