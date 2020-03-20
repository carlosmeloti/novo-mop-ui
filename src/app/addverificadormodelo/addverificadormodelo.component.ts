import { Component, OnInit, ViewChild } from '@angular/core';
import { ModmonitoramentotemplateService } from '../modmonitoramentotemplate/modmonitoramentotemplate.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Cadtipodeverificador, Verificador_m, Modverificadoresdomodelo } from '../core/model';
import { CadtipodeverificadorService } from '../cadtipodeverificador/cadtipodeverificador.service';
import { VerificadorMComponent } from '../verificador-m/verificador-m.component';
import { VerificadorMService, CadverificadorFiltro } from '../verificador-m/verificador-m.service';
import { FormControl } from '@angular/forms';
import { AddverificadormodeloService } from './addverificadormodelo.service';


@Component({
  selector: 'app-addverificadormodelo',
  templateUrl: './addverificadormodelo.component.html',
  styleUrls: ['./addverificadormodelo.component.css']
})
export class AddverificadormodeloComponent implements OnInit {

  MonitoramentoTemplate = [];
  cadTipoDeVerificadores = [];
  cdTipoDeVerificador: any;
  verificadorm = [];
  filtro = new CadverificadorFiltro;

  @ViewChild('tabela') grid;

  verificadorMSalvar = new Verificador_m();
  addVerificadoresModeloSalvar = new Modverificadoresdomodelo();

  
  constructor(
    private modmonitoramentotemplateService: ModmonitoramentotemplateService,
   
    private verificadorM: VerificadorMService,
    private cadTipoDeVerificadoresService: CadtipodeverificadorService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarMonitoramentoTemplate()
    this.carregarTipoDeVerificadores()
    this.carregarMonitoramentoTemplate()
    this.carregarVerificadores()
  }

  carregarMonitoramentoTemplate() {
    return this.modmonitoramentotemplateService.listarTodas()
      .then(modmonitoramento => {
        this.MonitoramentoTemplate = modmonitoramento.map(c => ({ label: c.cdTemplate + " - " + c.nmTemplate, value: c.cdTemplate }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTipoDeVerificadores() {
    return this.cadTipoDeVerificadoresService.listarTodas()
          .then(cadTipoDeVerificadores => {
        this.cadTipoDeVerificadores = cadTipoDeVerificadores.map(c => ({ label: c.cdTipoDeVerificador + " - " + c.nmTipoDeVerificador, value: c.cdTipoDeVerificador }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarVerificadores() {
    return this.verificadorM.listarTodas()
          .then(verificadorM => {
        this.verificadorM = verificadorM.map(c => ({ label: c.codalfa, value: c.cdVerificador }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  



}
