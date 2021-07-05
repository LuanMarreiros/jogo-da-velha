import { EventEmitter, Injectable } from '@angular/core';
import { Jogada } from '../../models/jogada/jogada.model';
import { Jogador } from '../../models/jogador/jogador.model';
import { AnalisadorJogadasService } from '../analisador-jogadas/analisador-jogadas.service';

@Injectable({
  providedIn: 'root'
})
export class ControladorJogadaService {

  private _eventEmitter = new EventEmitter<any>();

  private _camposMarcados = [];

  constructor(private _analisadorJogadasService: AnalisadorJogadasService) { }

  jogar(campo: number, jogador: Jogador) {
    const obj = Object.assign({ campo: campo, camposMarcados: this._camposMarcados }, jogador);

    this.setNumerosMarcados(Object.assign({ campo: campo }, jogador));
    this._eventEmitter.emit(obj);
  }

  escutarJogadas(): EventEmitter<any> {
    return this._eventEmitter;
  }

  setNumerosMarcados(campo) {
    let existeNumero = false;

    this._camposMarcados.forEach(function (element) {
      if (element.campo === campo.campo) {
        existeNumero = true;;
      }
    })

    if (!existeNumero) {
      this._camposMarcados.push(campo);
    }
  }

  deveFinalizar(ganhador: Jogada) {
    this._camposMarcados = [];
    this._analisadorJogadasService.emit({ finalizar: true, _isMaquina: ganhador._isMaquina, velha: ganhador.velha })
  }
}