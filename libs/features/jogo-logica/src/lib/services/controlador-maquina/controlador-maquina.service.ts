import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControladorMaquinaService {

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

  private verificarNumerosRepetidos(numerosMarcados, newNumeroAleatorio) {
    let contagem = 0;

    while (contagem !== 7) {
      for (const numeroMarcado of numerosMarcados) {
        if (numeroMarcado.campo === newNumeroAleatorio) {
          newNumeroAleatorio = newNumeroAleatorio === 9 ? 1 : newNumeroAleatorio + 1;
        }
      }
      contagem++;
    }

    return newNumeroAleatorio;
  }

  jogar(numerosMarcados: any[], nivel: number) {
    let numeroAleatorio = (Math.floor(Math.random() * 8)) + 1;

    switch (nivel) {
      case 1: {
        numeroAleatorio = this.nivel1(numerosMarcados, numeroAleatorio);
        break;
      }
      case 2: {
        numeroAleatorio = this.nivel2(numerosMarcados, numeroAleatorio);
        break;
      }
      case 3: {
        numeroAleatorio = this.nivel3(numerosMarcados, numeroAleatorio);
        break;
      }
    }

    return numeroAleatorio;
  }

  nivel1(numerosMarcados: any[], numeroAleatorio) {
    let newNumeroAleatorio = numeroAleatorio;

    newNumeroAleatorio = this.verificarNumerosRepetidos(numerosMarcados, newNumeroAleatorio);

    return newNumeroAleatorio;
  }

  nivel2(numerosMarcados: any[], numeroAleatorio) {
    const jogadasJogador = []
    let newNumeroAleatorio = numeroAleatorio;
    let contagem = 0;
    let indexSalvo = 0;

    numerosMarcados.forEach(numeros => {
      if (numeros._isMaquina === false) {
        jogadasJogador.push(numeros.campo);
      }
    })

    jogadasJogador.sort();

    this.sequencia1.forEach((sequencia, index) => {
      if (sequencia[0] === jogadasJogador[0] && contagem !== 1) {
        if (sequencia[1] === jogadasJogador[1]) {
          indexSalvo = index;
          newNumeroAleatorio = sequencia[2];
          contagem++;
        } else if (sequencia[2] === jogadasJogador[2]) {
          indexSalvo = index;
          newNumeroAleatorio = sequencia[1];
          contagem++;
        } else if (sequencia[2] === jogadasJogador[1]) {
          indexSalvo = index;
          newNumeroAleatorio = sequencia[1];
          contagem++;
        } else if (sequencia[1] === jogadasJogador[0]) {
          indexSalvo = index;
          newNumeroAleatorio = sequencia[2];
          contagem++;
        } else if (sequencia[1] === jogadasJogador[2]) {
          indexSalvo = index;
          newNumeroAleatorio = sequencia[1];
          contagem++;
        }
      }
    })

    newNumeroAleatorio = this.verificarNumerosRepetidos(numerosMarcados, newNumeroAleatorio);

    return newNumeroAleatorio;
  }

  nivel3(numerosMarcados: any[], numeroAleatorio) {
    const jogadasMaquina = []
    let newNumeroAleatorio = numeroAleatorio;
    let indexSalvo = 0;

    numerosMarcados.forEach(numeros => {
      if (numeros._isMaquina) {
        jogadasMaquina.push(numeros.campo);
      }
    })

    jogadasMaquina.sort();

    this.sequencia1.forEach(sequencia => {
      if (jogadasMaquina[0] === sequencia[0 && indexSalvo <= 1]) {
        newNumeroAleatorio = sequencia[1];
        indexSalvo++;
        if (jogadasMaquina[1] === sequencia[1]) {
          newNumeroAleatorio = sequencia[2];
          indexSalvo++;
        } else if (jogadasMaquina[2] === sequencia[1]) {
          newNumeroAleatorio = sequencia[1];
          indexSalvo++;
        }
      }
    })

    newNumeroAleatorio = this.verificarNumerosRepetidos(numerosMarcados, newNumeroAleatorio);

    return newNumeroAleatorio;
  }
}