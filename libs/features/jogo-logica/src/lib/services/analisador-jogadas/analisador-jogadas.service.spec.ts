import { TestBed } from '@angular/core/testing';

import { AnalisadorJogadasService } from './analisador-jogadas.service';

describe('AnalisadorJogadasService', () => {
  let service: AnalisadorJogadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisadorJogadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
