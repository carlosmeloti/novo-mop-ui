import { Component, OnInit } from '@angular/core';
import { ModmonitoramentotemplateService } from '../modmonitoramentotemplate/modmonitoramentotemplate.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AppmonitoramentoService } from '../appmonitoramento/appmonitoramento.service';

import { AppAvaliacao, AppFormularioColeta } from '../core/model';
import { AppavaliacaoService } from '../appavaliacao/appavaliacao.service';
import { AppformulariocoletaService, FormFiltro } from './appformulariocoleta.service';

@Component({
  selector: 'app-appformulariocoleta',
  templateUrl: './appformulariocoleta.component.html',
  styleUrls: ['./appformulariocoleta.component.css']
})
export class AppformulariocoletaComponent {

  AppMonitoramento = [];
  avaliacao = [];
  appformulario  = [];
  cdTemplate: number;
  appformularioSalvar = new AppFormularioColeta();
  filtro = new FormFiltro();

  constructor(
    private appformularioService: AppformulariocoletaService,
    private appmonitoramentoService: AppmonitoramentoService,
    private appavaliacaoService: AppavaliacaoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarAppMonitoramento();
    this.carregarAvaliacao();
  }

  pesquisar() {

    const filtro: FormFiltro = {
      cdTemplate: this.appformularioSalvar.cdMonitoramento.cdTemplate.cdTemplate
      
    }
    this.appformularioService.pesquisar(filtro)
      .then(appformulario => this.appformulario = appformulario);
  }
 

  carregarAppMonitoramento() {
    return this.appmonitoramentoService.listarTodas()
      .then(appmonitoramentomonitoramento => {
        this.AppMonitoramento = appmonitoramentomonitoramento.map(c => ({ label: c.cdTemplate.cdTemplate + " - " + c.nmMonitoramento, value: c.cdMonitoramento }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAvaliacao() {
    return this.appavaliacaoService.listarTodas()
      .then(avaliacao => {
        this.avaliacao = avaliacao.map(c => ({ label: c.cdAvaliacao + " - " + c.nmAvaliacao, value: c.cdAvaliacao }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  

}
