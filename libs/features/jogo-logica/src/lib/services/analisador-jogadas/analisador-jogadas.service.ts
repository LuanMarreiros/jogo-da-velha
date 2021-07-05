import { EventEmitter, Injectable } from '@angular/core';
import { CamposMarcados } from '../../models/campos-marcados/campos-marcados.model';
import { Jogada } from '../../models/jogada/jogada.model';

@Injectable({
  providedIn: 'root'
})
export class AnalisadorJogadasService {

  private eventEmitter = new EventEmitter<any>();

  sequencia1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ]

  constructor() { }

  analisarJogadas(camposMarcados: CamposMarcados[]): Jogada {
    if (this.verificarJodadasNaoBola(camposMarcados)) {
      return { ganhador: 'X', temGanhador: true, velha: false }
    } else if (this.verificarJodadasBola(camposMarcados)) {
      return { ganhador: 'BOLA', temGanhador: true, velha: false }
    } else {
      return { ganhador: undefined, temGanhador: false, velha: camposMarcados.length === 9 ? true : false };
    }
  }

  verificarJodadasBola(camposMarcados: CamposMarcados[]) {
    const sequenciaMarcada = [];
    let acertou = 1;

    camposMarcados.forEach(campoMarcado => {
      if (campoMarcado._isBola) {
        sequenciaMarcada.push(campoMarcado.campo);
      }
    })

    sequenciaMarcada.sort();

    this.sequencia1.forEach((sequencia, index) => {
      if (acertou < 3) {
        acertou = 0;

        for (let i = 0; i < sequenciaMarcada.length; i++) {
          if (sequencia.includes(sequenciaMarcada[i])) {
            acertou++;
          }
        }

      }
    })

    return acertou === 3;
  }

  verificarJodadasNaoBola(camposMarcados: CamposMarcados[]) {
    const sequenciaMarcada = [];
    let acertou = 1;

    camposMarcados.forEach(campoMarcado => {
      if (campoMarcado._isBola === false) {
        sequenciaMarcada.push(campoMarcado.campo);
      }
    })

    sequenciaMarcada.sort();

    this.sequencia1.forEach((sequencia) => {
      if (acertou < 3) {
        acertou = 0;

        for (let i = 0; i < sequenciaMarcada.length; i++) {
          if (sequencia.includes(sequenciaMarcada[i])) {
            acertou++;
          }
        }

      }
    })

    return acertou === 3;
  }

  escutarJogadas() {
    return this.eventEmitter;
  }

  emit(dados) {
    this.eventEmitter.emit(dados);
  }

}