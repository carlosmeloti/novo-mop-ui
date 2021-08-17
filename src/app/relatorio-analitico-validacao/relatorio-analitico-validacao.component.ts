import { ErrorHandlerService } from './../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { ToastyService } from 'ng2-toasty';
import { AppmonitoramentoverificadorService } from './../appmonitoramentoverificador/appmonitoramentoverificador.service';
import { AppmonitoramentoService } from './../appmonitoramento/appmonitoramento.service';
import { Component, OnInit } from '@angular/core';
import { FormFiltro, RelatorioService } from './relatorio.service';
import { MenuService } from '../menu/menu.service';
import { MenuEmpresa } from '../core/model';
import { AppavaliacaoService } from '../appavaliacao/appavaliacao.service';

@Component({
  selector: 'app-relatorio-analitico-validacao',
  templateUrl: './relatorio-analitico-validacao.component.html',
  styleUrls: ['./relatorio-analitico-validacao.component.css']
})
export class RelatorioAnaliticoValidacaoComponent implements OnInit {

  empresaSelecionada = new MenuEmpresa();
  cdEmp: any;
  cdMon: any;
  cdAva: any;
  cdavaliacao: number;
  AppMonitoramento = [];
  relatorioAnaliticos = [];
  avaliacao = [];
  constructor(
    private appmonitoramentoService: AppmonitoramentoService,
    private appMonitoramentoVerificadorService: AppmonitoramentoverificadorService,
    private appavaliacaoService: AppavaliacaoService,
    private menuService: MenuService,
    private relatorioService: RelatorioService, 
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarAppMonitoramento();
    this.carregarAvaliacao();
  }

  gerar() {
    const filtro: FormFiltro = {
      cdavaliacao: this.cdavaliacao
    }
    this.relatorioService.relatorio(filtro)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }

  

  carregarAppMonitoramento() {
    return this.appmonitoramentoService.listarTodas()
      .then(appmonitoramentomonitoramento => {
        this.AppMonitoramento = appmonitoramentomonitoramento.map(c => ({ label: c.cdMonitoramento + " - " + c.nmMonitoramento, value: c.cdTemplate.cdTemplate }));
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
