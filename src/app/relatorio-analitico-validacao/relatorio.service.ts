import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

export class FormFiltro {
  cdavaliacao: any
}

@Injectable()
export class RelatorioService {
  relatorioAnaliticoURL =  'http://localhost:8081/modverificadoresmonitoramentotemplate/relatorioanalitico'

  constructor(private http: Http) { }

  relatorio(filtro: FormFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    
      params.set('cdavaliacao', filtro.cdavaliacao);
   
    return this.http.get(`${this.relatorioAnaliticoURL}?cdavaliacao=${filtro.cdavaliacao}&ordCatAva=false&ordHierarquica=false`, 
    { responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob())

  };
}
