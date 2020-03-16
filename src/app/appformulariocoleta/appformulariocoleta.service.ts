import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

export class FormFiltro {
  cdTemplate: any;
}

@Injectable()
export class AppformulariocoletaService {

 
  formURL = "http://localhost:8081/modverificadoresmonitoramentotemplate/teste?cdTemplate=1";

  constructor(private http: Http) { }

  pesquisar(filtro: FormFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.cdTemplate) {
      params.set('cdTemplate', filtro.cdTemplate);
    }

    return this.http.get(`${this.formURL}`, { headers, search: filtro })
      .toPromise()
      .then(response => response.json().content)

  };


}
