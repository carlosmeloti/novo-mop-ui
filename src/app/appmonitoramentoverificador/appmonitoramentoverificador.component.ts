import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AppmonitoramentoService } from '../appmonitoramento/appmonitoramento.service';

@Component({
  selector: 'app-appmonitoramentoverificador',
  templateUrl: './appmonitoramentoverificador.component.html',
  styleUrls: ['./appmonitoramentoverificador.component.css']
})
export class AppmonitoramentoverificadorComponent {

  monitoramentos = [];

  @ViewChild('tabela') grid;
  constructor(
    private appmonitoramentoService: AppmonitoramentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

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
