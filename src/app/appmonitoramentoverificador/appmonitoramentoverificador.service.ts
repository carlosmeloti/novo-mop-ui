import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';



export class VerificadoresMonitoramentoFiltro{

  cdMonitoramento:any;

}
@Injectable()
export class AppmonitoramentoverificadorService {

  appMonitoramentoVerificadorurl = 'http://localhost:8081/appverificadoresmonitoramento';

  constructor(private http: Http) { }

  pesquisarPorMonitoramento(filtro: VerificadoresMonitoramentoFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.cdMonitoramento) {
      params.set('cdMonitoramento', filtro.cdMonitoramento);
   }

   return this.http.get(`${this.appMonitoramentoVerificadorurl}`, { headers, search: filtro })
   .toPromise()
   .then(response => response.json().content)

  }; 

}
