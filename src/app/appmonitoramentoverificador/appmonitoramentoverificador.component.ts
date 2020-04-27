import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AppmonitoramentoService } from '../appmonitoramento/appmonitoramento.service';
import { VerificadoresMonitoramentoFiltro, AppmonitoramentoverificadorService } from './appmonitoramentoverificador.service';
import { AppMonitoramentoVerificador } from '../core/model';

@Component({
  selector: 'app-appmonitoramentoverificador',
  templateUrl: './appmonitoramentoverificador.component.html',
  styleUrls: ['./appmonitoramentoverificador.component.css']
})
export class AppmonitoramentoverificadorComponent {

  monitoramentos = [];
  verificadordoMonitoramentoTabela: any;
  appMonitoramentoVerificadorSalvar = new AppMonitoramentoVerificador();

  @ViewChild('tabela') grid;
  constructor(
    private appmonitoramentoService: AppmonitoramentoService,
    private appMonitoramentoVerificadorService: AppmonitoramentoverificadorService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.carregarMonitoramentos();
  }

  onRowEditInit(verificadordoMonitoramentoTabela) {
    console.log('Row edit initialized');
  }

  carregarMonitoramentos() {
    return this.appmonitoramentoService.listarTodas()
      .then(monitoramentos => {
        this.monitoramentos = monitoramentos.map(c => ({ label: c.cdMonitoramento + " - " + c.nmMonitoramento, value: c.cdMonitoramento }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarPorMonitoramento() {
      
    const filtro: VerificadoresMonitoramentoFiltro = {
      cdMonitoramento: this.appMonitoramentoVerificadorSalvar.cdMonitoramento.cdMonitoramento
    }
    this.appMonitoramentoVerificadorService.pesquisarPorMonitoramento(filtro)
      .then(verificadordoMonitoramentoTabela => this.verificadordoMonitoramentoTabela = verificadordoMonitoramentoTabela);
  
  
  }

}
