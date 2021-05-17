import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppColetaDeDados } from '../core/model';
import { FormControl } from '@angular/forms';

export class AvaliacaoMonitoramentoFiltro{
  cdMonitoramento:any;
}
export class AvaliacaoFiltro{
  cdAvaliacao:any;
  cdEmpresa:any;
}

@Injectable()
export class AppcoletadedadosService {

  coletadedadosurl = 'http://localhost:8081/appcoletadedados'

  constructor(private http: Http) { }


  pesquisarPorAvaliacao(filtro: AvaliacaoFiltro): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('cdEmpresa', filtro.cdEmpresa);
    params.set('cdAvaliacao', filtro.cdAvaliacao);

    return this.http.get(`${this.coletadedadosurl}`, { headers, search: filtro })
    .toPromise()
    .then(response => response.json().content)


  };

  buscarPorCodigo(codigoAppColetaDeDado: number): Promise<AppColetaDeDados> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.coletadedadosurl}/${codigoAppColetaDeDado}`, { headers })
      .toPromise()
      .then(response => {
        const AppColetaDeDados = response.json() as AppColetaDeDados;

        return AppColetaDeDados;
      });
  }

  atualizar(appColetaDeDados: AppColetaDeDados): Promise<AppColetaDeDados> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.coletadedadosurl}/${appColetaDeDados.cdColetaDeDaDos}`,
      JSON.stringify(appColetaDeDados), { headers })
      .toPromise()
      .then(response => {
        const cadamostragemAlterada = response.json() as AppColetaDeDados;
        return cadamostragemAlterada;

      });
  }




}
