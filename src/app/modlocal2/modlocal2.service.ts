import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Modlocal2 } from '../core/model';

export class Modlocal3Filtro {
  cdEmpresa: any;
  cdLocal1: any;
  cdLocal2: any;
}

export class Modlocal2Filtro {
  cdEmpresa: any;
  nmLocal2: string;
  cdLocal1: any;
}
export class Modlocal2Filtro2 {
  cdEmpresa: any;
}

export class filtroAvaliacao{
  cdLocal1: number;
  cdEmpresa: number;
}

@Injectable()
export class Modlocal2Service {
  modlocal2URL = 'http://localhost:8081/localdeavaliacao';


  constructor(private http: Http) { }


  pesquisarModlocal2(filtro: Modlocal2Filtro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.cdLocal1) {
      params.set('cdLocal1', filtro.cdLocal1);
    }

    return this.http.get(`${this.modlocal2URL}`, { headers, search: filtro })
      .toPromise()
      .then(response => response.json().content)

  };


  excluir(cdLocal2: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.modlocal2URL}/${cdLocal2}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(modlocal2: Modlocal2): Promise<Modlocal2> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.modlocal2URL, JSON.stringify(modlocal2), { headers })
      .toPromise()
      .then(response => response.json());
  }

  listarTodas(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.modlocal2URL, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  atualizar(modlocal2: Modlocal2): Promise<Modlocal2> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.modlocal2URL}/${modlocal2.cdLocal2}`,
      JSON.stringify(modlocal2), { headers })
      .toPromise()
      .then(response => {
        const modlocal2Alterada = response.json() as Modlocal2;


        return modlocal2Alterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Modlocal2> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.modlocal2URL}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const modlocal2 = response.json() as Modlocal2;

        return modlocal2;
      });
  }

  listarPorLocal1(cdLocal1:any): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.modlocal2URL}?cdLocal1=${cdLocal1}`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  listarPorLocal1Filtro(filtro:filtroAvaliacao): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.modlocal2URL}`, { headers, search: filtro })
      .toPromise()
      .then(response => response.json().content);
  }

  



}
