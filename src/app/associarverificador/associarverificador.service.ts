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

@Injectable()
export class AssociarverificadorService {

  verificadorlocalmURL = 'http://localhost:8081/verificador_local_m';

  constructor(private http: Http) { }


  buscarPorCodigo(codigo: number): Promise<Verificador_Local_m> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.verificadorlocalmURL}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const cadverificadorlocalm = response.json() as Verificador_Local_m;

        return cadverificadorlocalm;
      });
}
}
