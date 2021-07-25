import { ErrorHandlerService } from './../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { ToastyService } from 'ng2-toasty';
import { AppmonitoramentoverificadorService } from './../appmonitoramentoverificador/appmonitoramentoverificador.service';
import { AppmonitoramentoService } from './../appmonitoramento/appmonitoramento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-analitico-validacao',
  templateUrl: './relatorio-analitico-validacao.component.html',
  styleUrls: ['./relatorio-analitico-validacao.component.css']
})
export class RelatorioAnaliticoValidacaoComponent implements OnInit {
  monitoramentos = [];
  relatorioAnaliticos = [];
  constructor(
    private appmonitoramentoService: AppmonitoramentoService,
    private appMonitoramentoVerificadorService: AppmonitoramentoverificadorService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarMonitoramentos();
  }

  carregarMonitoramentos() {
    return this.appmonitoramentoService.listarTodas()
    .then(monitoramentos => {
      this.monitoramentos = monitoramentos.map(c => ({ label: c.cdMonitoramento + " - " + c.nmMonitoramento, value: c.cdMonitoramento }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
