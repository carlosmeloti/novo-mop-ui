

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Modlocal3 } from '../core/model';

export class Modlocal3Filtro {

  nmlocal1: string;
  nmLocal2: String;
  codigo: string;
  page = 0;
  size = 5;
  cdLocal2: any;
}

export class Filtro3{
   cdLocal1: any;
}



export class subLocalFiltro{
  nmLocal3: string;
  cdLocal1: number;
  cdLocal2: number;
  cdEmpresa: number;
}

@Injectable()
export class UnidadelocalsublocalService {

  modLocal3URL = 'http://localhost:8081/sublocaldeavaliacao';

  constructor(private http: Http) { }


  adicionar(modlocal3: Modlocal3): Promise<Modlocal3> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.modLocal3URL, JSON.stringify(modlocal3), { headers })
      .toPromise()
      .then(response => response.json());
  }

  buscarPorCodigo(codigo: number): Promise<Modlocal3> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.modLocal3URL}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const modlocal3 = response.json() as Modlocal3;

        return modlocal3;
      });
  }

  atualizar(modlocal3: Modlocal3): Promise<Modlocal3> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.modLocal3URL}/${modlocal3.cdLocal3}`,
      JSON.stringify(modlocal3), { headers })
      .toPromise()
      .then(response => {
        const modlocal3Alterada = response.json() as Modlocal3;


        return modlocal3Alterada;
      });
  }

  

  pesquisarSubLocal(filtro2: subLocalFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro2.nmLocal3) {
      params.set('cdLocal1', filtro2.nmLocal3);
     // params.set('cdLocal2', filtro2.nmLocal2)
    }

    return this.http.get(`${this.modLocal3URL}`, { headers, search: filtro2 })
      .toPromise()
      .then(response => response.json().content)

  };





}
