import { Cadfrequencia } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { URLSearchParams } from '@angular/http';

export class CadfrequenciaFiltro{
  //nmFrequencia : string;
  cdEmpresa:any;
  //page = 0;
  //size = 5;
}

@Injectable()
export class CadfrequenciaService {

  cadfrequenciaURL = 'http://localhost:8081/cadfrequencia';


  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    
      params.set('cdEmpresa', cdEmpresa);
    
    return this.http.get(`${this.cadfrequenciaURL}?cdEmpresa=${cdEmpresa}`, { headers})
    .toPromise()
    .then(response => response.json().content)


  };

  pesquisar(filtro: CadfrequenciaFiltro): Promise<any> {

    
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.cdEmpresa) {
      params.set('cdEmpresa', filtro.cdEmpresa);
    }
    return this.http.get(`${this.cadfrequenciaURL}`, { headers, search: filtro })
    .toPromise()
    .then(response => response.json().content)

  }

    excluir(codigo: number): Promise<void> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

      return this.http.delete(`${this.cadfrequenciaURL}/${codigo}`, { headers })
        .toPromise()
        .then(() => null);
    }

    adicionar(cadfrequencia: Cadfrequencia): Promise<Cadfrequencia>{
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.cadfrequenciaURL, JSON.stringify(cadfrequencia), { headers })
        .toPromise()
        .then(response => response.json());
    }
    listarTodas(cdEmpresa:any): Promise<any> {
      const headers = new Headers;
       headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
       headers.append('Content-Type', 'application/json');

       return this.http.get(`${this.cadfrequenciaURL}?cdEmpresa=${cdEmpresa}`, { headers })
         .toPromise()
         .then(response => response.json().content);
   }

   atualizar(cadfrequencia: Cadfrequencia): Promise<Cadfrequencia>{
     const headers = new Headers;
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     headers.append('Content-Type', 'application/json');

     return this.http.put(`${this.cadfrequenciaURL}/${cadfrequencia.cdFrequencia}`,
         JSON.stringify(cadfrequencia), { headers })
       .toPromise()
       .then(response => {
         const cadfrequenciaAlterada = response.json() as Cadfrequencia;


         return cadfrequenciaAlterada;
       });
 }

   buscarPorCodigo(codigo: number): Promise<Cadfrequencia> {
     const headers = new Headers();
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

     return this.http.get(`${this.cadfrequenciaURL}/${codigo}`, { headers })
       .toPromise()
       .then(response => {
         const cadfrequencia = response.json() as Cadfrequencia;

         return cadfrequencia;
       });
 }

}
