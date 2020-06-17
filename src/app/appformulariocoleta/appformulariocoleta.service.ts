import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';

export class FormFiltro {
  cdTemplate: any;
}

@Injectable()
export class AppformulariocoletaService {

 
  formURL = "http://localhost:8081/modverificadoresmonitoramentotemplate/relatorio";

  constructor(private http: Http) { }

  relatorio(filtro: FormFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    
      params.set('cdTemplate', filtro.cdTemplate);
   
    return this.http.get(`${this.formURL}?cdTemplate=${filtro.cdTemplate}`, 
    { responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob())

  };


}
