import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

@Injectable()
export class AddverificadormodeloService {

  constructor(private http: Http) { }

  verificadoresdomodelourlresumo = 'http://localhost:8081/modverificadoresmonitoramentotemplate?resumo';
  verificadoresdomodelourl = 'http://localhost:8081/modverificadoresmonitoramentotemplate';


  
}
