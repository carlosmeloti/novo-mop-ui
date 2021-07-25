import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  relatorioAnaliticoURL =  'http://localhost:8081/'

  constructor(private http: Http) { }
}
