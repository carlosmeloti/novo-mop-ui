import { Injectable } from '@angular/core';
import { Verificador_Local_m } from '../core/model';
import { Http, Headers } from '@angular/http';

export class CadverificadorLocalFiltro{
  nmTipoVerificador : string;

}
export class FiltroModelosPorTipo2{
  cdTipoDeVerificador: any;
}


export class FiltroLocal2{
  cdLocal1: any;
}

export class subLocalFiltro2{
  nmLocal3: string;
  cdLocal1: number;
  cdLocal2: number;
  cdEmpresa: number;
}

export class filtroPesquisa{
  cdEmpresa: any;
  codigo: any;
}

@Injectable()
export class AssociarverificadorService {

  verificadorlocalmURL = 'http://localhost:8081/associarverificadores';
  materiaisURL = 'http://localhost:8081/associarverificadoresmateriais';
  constructor(private http: Http) { }


  buscarPorCodigo(codigo: number): Promise<Verificador_Local_m> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.verificadorlocalmURL}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const verificadorlocalm = response.json() as Verificador_Local_m;

        return verificadorlocalm;
      });
}

listarMateriais(): Promise<any> {
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  headers.append('Content-Type', 'application/json');

  return this.http.get(this.materiaisURL, { headers })
    .toPromise()
    .then(response => response.json().content);
}


    pesquisar(filtro2: filtroPesquisa): Promise<any> {
    
      const params = new URLSearchParams;
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  
      
        params.set('id_verificador_local', filtro2.codigo);
        params.set('cdEmpresa', filtro2.cdEmpresa);
      return this.http.get(`${this.verificadorlocalmURL}?id_verificador_local=${filtro2.codigo}&cdEmpresa=${filtro2.cdEmpresa}`, { headers})
      .toPromise()
      .then(response => response.json().content)
    };
}
