import { Component, OnInit, ViewChild } from '@angular/core';
import { ModmonitoramentotemplateService } from '../modmonitoramentotemplate/modmonitoramentotemplate.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addverificadormodelo',
  templateUrl: './addverificadormodelo.component.html',
  styleUrls: ['./addverificadormodelo.component.css'] 
})
export class AddverificadormodeloComponent implements OnInit {

  MonitoramentoTemplate = [];
  @ViewChild('tabela') grid;
  

  constructor(
    private modmonitoramentotemplateService: ModmonitoramentotemplateService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarMonitoramentoTemplate() 
  }

  carregarMonitoramentoTemplate() {
    return this.modmonitoramentotemplateService.listarTodas()
      .then(modmonitoramento => {
        this.MonitoramentoTemplate = modmonitoramento.map(c => ({ label: c.cdTemplate + " - " + c.nmTemplate, value: c.cdTemplate }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
