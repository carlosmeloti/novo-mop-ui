import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Modverificadoresdomodelo} from '../core/model';

export class ModverificadoresdomodeloFiltro{

  txColetaAnalitica: string;
  page = 0;
  size = 5;

}

@Injectable()
export class ModverificadoresdomodeloService {

  verificadoresdomodelourl = 'http://localhost:8081/modverificadoresmonitoramentotemplate';

  constructor(private http: Http) { }

  pesquisar(filtro: ModverificadoresdomodeloFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.txColetaAnalitica) {
      params.set('txColetaAnalitica', filtro.txColetaAnalitica);
    }

    return this.http.get(`${this.verificadoresdomodelourl}`, { headers, search: filtro })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const verificadordomodelo = responseJson.content;

        const resultado = {
          verificadordomodelo,
          total: responseJson.totalElements
        };
        return resultado;
      })

  };



}
