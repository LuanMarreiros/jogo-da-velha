import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Jogada } from '../../models/jogada/jogada.model';
import { Jogador } from '../../models/jogador/jogador.model';
import { AnalisadorJogadasService } from '../../services/analisador-jogadas/analisador-jogadas.service';
import { ControladorJogadaService } from '../../services/controlador-jogada/controlador-jogada.service';
import { ControladorMaquinaService } from '../../services/controlador-maquina/controlador-maquina.service';

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.scss']
})
export class CampoComponent implements OnInit {

  @Input() posicaoCampo: number;
  @Input() nivel: number;

  jogador = new Jogador();
  jogada = new Jogada();

  escolha = {
    situacao1: {
      campo: "X",
      ativo: false,
      isMaquina: false
    },
    situacao2: {
      campo: "O",
      ativo: false,
      isMaquina: true
    }
  }

  incriscao: Subscription;

  constructor(private _controladorService: ControladorJogadaService, private _maquina: ControladorMaquinaService, private _analisadorJodagasService: AnalisadorJogadasService) { }

  private emitirJogadaMaquina(campo, event) {
    if (campo) {
      const isMaquina = true;

      this.jogador.determinarEscolha(event._isBola ? false : true)
      this.jogador.determinarJogador(isMaquina);
      this._controladorService.jogar(campo, this.jogador);
    }
  }

  ngOnInit(): void {
    this.escutarJogadas();
  }

  escutarJogadas() {
    this.incriscao = this._controladorService.escutarJogadas().subscribe(event => {
      if (this.deveFinalizar(event)) {
        return;
      } else if (event.campo === this.posicaoCampo) {
        this.jogada = this._analisadorJodagasService.analisarJogadas(event.camposMarcados);
        this.jogada._isMaquina = event._isMaquina;

        this.verificarSeTemGanhador();

        this.isMaquina(event);
      }
    });
  }

  verificarSeTemGanhador() {
    if (this.jogada.temGanhador) {
      this._analisadorJodagasService.emit(this.jogada);
    } else if (this.jogada.velha) {
      this._analisadorJodagasService.emit(this.jogada);
    }
  }

  deveFinalizar(event) {
    if (event.finalizar) {
      this.escolha.situacao1.ativo = false;
      this.escolha.situacao2.ativo = false;
      return true;
    }

    return false;
  }

  isMaquina(event) {
    if (event._isMaquina) {
      if (!this.escolha.situacao1.ativo && !this.escolha.situacao2.ativo && event._isBola) {
        this.escolha.situacao2.ativo = event._isMaquina;
      } else if (!this.escolha.situacao1.ativo && !this.escolha.situacao2.ativo && !event._isBola) {
        this.escolha.situacao1.ativo = event._isMaquina;
      }
    } else {
      this.isJogador(event);
    }
  }

  isJogador(event) {
    if (!event._isMaquina) {
      if (!this.escolha.situacao1.ativo && !this.escolha.situacao2.ativo && event._isBola) {
        this.escolha.situacao2.ativo = event._isMaquina === false ? true : false;
        if (this.jogada.temGanhador === false) {
          this.emitirJogadaMaquina(this._maquina.jogar(event.camposMarcados, this.nivel), event);
        }
      } else if (!this.escolha.situacao1.ativo && !this.escolha.situacao2.ativo && !event._isBola) {
        this.escolha.situacao1.ativo = event._isMaquina === false ? true : false;
        if (this.jogada.temGanhador === false) {
          this.emitirJogadaMaquina(this._maquina.jogar(event.camposMarcados, this.nivel), event);
        }
      }
    }
  }

  ngOnDestroy() {
    this.incriscao.unsubscribe();
  }
}