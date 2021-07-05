export class Jogador {

    private _isBola: boolean;
    private _isMaquina: boolean;

    determinarJogador(isMaquina: boolean) {
        this._isMaquina = isMaquina;
    }

    determinarEscolha(isBola: boolean) {
        this._isBola = isBola;
    }

    verEscolha(): boolean {
        return this._isBola;
    }

    verJogador(): boolean {
        return this._isMaquina;
    }

}