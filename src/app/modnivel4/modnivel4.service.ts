import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ModNivel4 } from '../core/model';

export class Filtro2 {
  cdEmpresa: any;
  cdNivel1: any;
}

export class Filtro3 {
  cdEmpresa: any;
  nmNivel3:string;
  cdNivel1: any;
  cdNivel2: any;
}

export class Modnivel3Filtro {

  nmNivel3: string;
  //cdNivel1: any;
  cdNivel2: any;
}

export class Modnivel4Filtro {
  cdEmpresa:any;
  cdNivel1:any;
  cdNivel2:any;
  cdNivel3: any;
  nmNivel4: string;
}

@Injectable()
export class Modnivel4Service {


  modnivel4URL = 'http://localhost:8081/modnivel4';

  constructor(private http: Http) { }

  pesquisarNivel4(filtro: Modnivel4Filtro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.nmNivel4) {
      params.set('cdNivel3', filtro.nmNivel4);
    }

    return this.http.get(`${this.modnivel4URL}`, { headers, search: filtro })
      .toPromise()
      .then(response => response.json().content)

  };
  
  excluir(cdNivel4: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.modnivel4URL}/${cdNivel4}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(modnivel4: ModNivel4): Promise<ModNivel4> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.modnivel4URL, JSON.stringify(modnivel4), { headers })
      .toPromise()
      .then(response => response.json());
  }

  listarTodas(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.modnivel4URL, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  listarPorNivel3(cdNivel3:any): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.modnivel4URL}?cdNivel3=${cdNivel3}`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  atualizar(modnivel4: ModNivel4): Promise<ModNivel4> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.modnivel4URL}/${modnivel4.cdNivel4}`,
      JSON.stringify(modnivel4), { headers })
      .toPromise()
      .then(response => {
        const modnivel4Alterada = response.json() as ModNivel4;


        return modnivel4Alterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<ModNivel4> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.modnivel4URL}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const modnivel4 = response.json() as ModNivel4;

        return modnivel4;
      });
  }


}
