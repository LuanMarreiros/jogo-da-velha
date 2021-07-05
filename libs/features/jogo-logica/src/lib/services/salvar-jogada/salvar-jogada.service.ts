import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Placar } from '../../models/placar/placar.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarJogadaService {

  constructor(private _http: HttpClient) { }

  post(data) {
    return this._http.post('http://localhost:3000/jogadas', data).pipe(retry(1),catchError(this.handlerErro));
  }

  get() {
    return this._http.get<Placar[]>('http://localhost:3000/jogadas').pipe(
      retry(1),
      map(data => {
        if (data[0]) {
          const placar = new Placar();

          placar.jogador = data[data.length - 1].jogador;
          placar.maquina = data[data.length - 1].maquina;
          placar.velha = data[data.length - 1].velha;

          return placar;
        }
      }),
      catchError(this.handlerErro)
    );
  };

  private handlerErro(error){
    alert('Não foi possível carregar as informações do placar. As informações dessa sessão não serão salvas.');
    return error;
  }
}
