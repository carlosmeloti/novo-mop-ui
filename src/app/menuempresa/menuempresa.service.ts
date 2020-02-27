import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { MenuEmpresa } from '../core/model';

export class MenuempresaFiltro {
  nmEmpresa: string;
  page = 0;
  size = 5;
}

@Injectable()
export class MenuempresaService {

  menuempresaurl = 'http://localhost:8081/menuempresa';

  constructor(private http: Http) { }


  pesquisar(filtro: MenuempresaFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());

    if (filtro.nmEmpresa) {
      params.set('nmEmpresa', filtro.nmEmpresa);
    }

    return this.http.get(`${this.menuempresaurl}`, { headers, search: filtro })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const menuempresa = responseJson.content;

        const resultado = {
          menuempresa,
          total: responseJson.totalElements
        };
        return resultado;
      })

  };


  excluir(cdEmpresa: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.menuempresaurl}/${cdEmpresa}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(cadempresa: MenuEmpresa): Promise<MenuEmpresa> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.menuempresaurl, JSON.stringify(cadempresa), { headers })
      .toPromise()
      .then(response => response.json());
  }



  listarTodas(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.menuempresaurl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  atualizar(menuEmpresa: MenuEmpresa): Promise<MenuEmpresa> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.menuempresaurl}/${menuEmpresa.cdEmpresa}`,
      JSON.stringify(menuEmpresa), { headers })
      .toPromise()
      .then(response => {
        const menuEmpresaAlterada = response.json() as MenuEmpresa;


        return menuEmpresaAlterada;
      });
  }

  buscarPorCodigo(cdEmpresa: number): Promise<MenuEmpresa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.menuempresaurl}/${cdEmpresa}`, { headers })
      .toPromise()
      .then(response => {
        const menuEmpresa = response.json() as MenuEmpresa;

        return menuEmpresa;
      });
  }

}