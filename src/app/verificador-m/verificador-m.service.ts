import { Injectable } from '@angular/core';
import { Verificador_m } from '../core/model';
import { Http, Headers } from '@angular/http';

export class CadverificadorFiltro{
  
  cdTipoDeVerificador: any;
  cdEmpresa: any;
 // nmTipoDeVerificador: string;

}

@Injectable()
export class VerificadorMService {

  verificadormURL = 'http://localhost:8081/verificador_m';
  verificadormURLResumo = 'http://localhost:8081/verificador_m?resumo';


  constructor(private http: Http) { }

  pesquisar(filtro: CadverificadorFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.cdTipoDeVerificador) {
      params.set('cdTipoDeVerificador', filtro.cdTipoDeVerificador);
   }

   return this.http.get(`${this.verificadormURL}`, { headers, search: filtro })
   .toPromise()
   .then(response => response.json())

  };


            buscarPorCodigo(codigo: number): Promise<Verificador_m> {
              const headers = new Headers();
              headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

              return this.http.get(`${this.verificadormURL}/${codigo}`, { headers })
                .toPromise()
                .then(response => {
                  const cadverificadorm = response.json() as Verificador_m;

                  return cadverificadorm;
                });
          }

          atualizar(verificador_m: Verificador_m): Promise<Verificador_m>{
            const headers = new Headers;
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append('Content-Type', 'application/json');

            return this.http.put(`${this.verificadormURL}/${verificador_m.nmverificador}`,
                JSON.stringify(verificador_m), { headers })
              .toPromise()
              .then(response => {
                const verificador_mAlterada = response.json() as Verificador_m;


                return verificador_mAlterada;
              });
        }

       listarTodas(): Promise<any> {
          const headers = new Headers;
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          headers.append('Content-Type', 'application/json');
      
          return this.http.get(this.verificadormURL, { headers })
            .toPromise()
            .then(response => response.json());
        }

        listarPorTipo(cdTipoDeVerificador:any): Promise<any> {
          const headers = new Headers;
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          headers.append('Content-Type', 'application/json');
      
          return this.http.get(`${this.verificadormURLResumo}&cdTipoDeVerificador=${cdTipoDeVerificador}`, { headers })
            .toPromise()
            .then(response => response.json());
        }


}
