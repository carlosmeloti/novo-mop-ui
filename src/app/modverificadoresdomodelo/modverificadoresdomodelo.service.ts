import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Modverificadoresdomodelo} from '../core/model';

export class FiltroModelosPorTipo{
  cdTipoDeVerificador: any;
}

export class Filtro2{
 cdTipoDeVerificador:any;
}
export class ModverificadoresdomodeloFiltro{
  cdTemplate: any;
  cdEmpresa: any;
 // page = 0;
 // size = 5;
}

@Injectable()
export class ModverificadoresdomodeloService {

  verificadoresdomodelourlresumo = 'http://localhost:8081/modverificadoresmonitoramentotemplate?resumo';
  verificadoresdomodelourl = 'http://localhost:8081/modverificadoresmonitoramentotemplate';
  constructor(private http: Http) { }

pesquisar(filtro: ModverificadoresdomodeloFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.cdTemplate) {
      params.set('cdTemplate', filtro.cdTemplate);
   }

   return this.http.get(`${this.verificadoresdomodelourlresumo}`, { headers, search: filtro })
   .toPromise()
   .then(response => response.json())

  };  


  excluir(cdVeriMod: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.verificadoresdomodelourl}/${cdVeriMod}`, { headers })
      .toPromise()
      .then(() => null);
  }

  



}
