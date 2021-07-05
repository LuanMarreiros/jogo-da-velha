import { Placar } from './../../models/placar/placar.model';
import { Component, OnInit } from '@angular/core';
import { Jogador } from '../../models/jogador/jogador.model';
import { Jogada } from '../../models/jogada/jogada.model';
import { AnalisadorJogadasService } from '../../services/analisador-jogadas/analisador-jogadas.service';
import { ControladorJogadaService } from '../../services/controlador-jogada/controlador-jogada.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ControladorMaquinaService } from '../../services/controlador-maquina/controlador-maquina.service';
import { SalvarJogadaService } from '../../services/salvar-jogada/salvar-jogada.service';

@Component({
  selector: 'app-corpo-principal',
  templateUrl: './corpo-principal.component.html',
  styleUrls: ['./corpo-principal.component.scss']
})
export class CorpoPrincipalComponent implements OnInit {

  quantidadeCampos = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  vitorias = {
    jogador: 0,
    maquina: 0,
    velha: 0,
  }

  jogador = new Jogador();

  ganhador = new Jogada();

  form: FormGroup;

  event;

  nivel;

  iniciar = false;

  opcao = "";

  constructor(private _controladorService: ControladorJogadaService, private _controladorMaquinaService: ControladorMaquinaService, private _analisadorJogadasService: AnalisadorJogadasService, private _salvarJogadaService: SalvarJogadaService) { }

  ngOnInit(): void {
    this.escutarJogadas();
    this.criarFormulario();
    this.contarPlacar();

    this.ganhador.temGanhador = false
  }

  criarFormulario() {
    this.form = new FormGroup({
      escolhaJogador1: new FormControl(false),
      escolhaJogador2: new FormControl(false),
      nivel1: new FormControl(false),
      nivel2: new FormControl(false),
      nivel3: new FormControl(false),
    })
  }

  deveFinalizar() {
    this.ganhador = {
      temGanhador: false,
      _isMaquina: undefined,
      ganhador: undefined,
      velha: undefined
    }

    this.iniciar = false;

    this._salvarJogadaService.post(this.vitorias).subscribe(event => { })
    return;
  }

  contarPlacar() {
    this._salvarJogadaService.get().subscribe((placar: Placar) => {
      if (placar) {
        this.vitorias = placar
      }
    })
  }

  alterarCheckbox(checkbox) {
    if (checkbox === 1) {
      this.opcao = "BOLA";
      this.form.controls.escolhaJogador1.setValue(true);
      this.form.controls.escolhaJogador2.setValue(false);
    } else {
      this.opcao = "X";
      this.form.controls.escolhaJogador1.setValue(false);
      this.form.controls.escolhaJogador2.setValue(true);
    }
  }

  alterarNivel(nivel) {
    this.nivel = nivel;

    switch (nivel) {
      case 1: {
        this.form.controls.nivel1.setValue(true);
        this.form.controls.nivel2.setValue(false);
        this.form.controls.nivel3.setValue(false);
        break;
      }
      case 2: {
        this.form.controls.nivel1.setValue(false);
        this.form.controls.nivel2.setValue(true);
        this.form.controls.nivel3.setValue(false);
        break;
      }
      case 3: {
        this.form.controls.nivel1.setValue(false);
        this.form.controls.nivel2.setValue(false);
        this.form.controls.nivel3.setValue(true);
        break;
      }
    }
  }

  emitirJogada(campo: number, isMaquina: boolean) {
    if (this.ganhador && this.ganhador.temGanhador === false) {
      if (isMaquina === false) {
        this.jogador.determinarEscolha(this.opcao === "BOLA")
      }
      this.jogador.determinarJogador(isMaquina);
      this._controladorService.jogar(campo, this.jogador);
      return;
    }
  }

  emitirJogadaInicial() {
    if (this.ganhador && this.ganhador.temGanhador === false) {
      setTimeout(() => {
        this.jogador.determinarEscolha(!(this.opcao === "BOLA"))
        this.emitirJogada(this._controladorMaquinaService.jogar([], this.nivel), true);
      }, 30);
    }
  }

  escolherOpcao(tipo) {
    this.jogador.determinarEscolha(tipo === 'BOLA')
  }

  escutarJogadas() {
    this._analisadorJogadasService.escutarJogadas().subscribe((event) => {
      if (event && event.finalizar) {
        this.verificarVitoria(event)
      } else {
        this.ganhador = event;
      }
    })
  }

  verificarVitoria(event: Jogada) {
    if (event._isMaquina && event.velha === false) {
      this.vitorias.maquina++;
    } else if (event.velha) {
      this.vitorias.velha++;
    } else {
      this.vitorias.jogador++;
    }

    this.deveFinalizar()
    return;
  }

  iniciarJogo() {
    this.iniciar = true;

    if (this.nivel >= 2) {
      this.emitirJogadaInicial();
    }
  }

  reiniciar() {
    this._controladorService.deveFinalizar(this.ganhador);
  }

}