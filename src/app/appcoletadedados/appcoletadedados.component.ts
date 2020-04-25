import { Component, OnInit } from '@angular/core';
import { AppmonitoramentoService } from '../appmonitoramento/appmonitoramento.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AppcoletadedadosService, AvaliacaoMonitoramentoFiltro} from './appcoletadedados.service';
import { AppColetaDeDados } from '../core/model';
import { AppavaliacaoService } from '../appavaliacao/appavaliacao.service';


@Component({
  selector: 'app-appcoletadedados',
  templateUrl: './appcoletadedados.component.html',
  styleUrls: ['./appcoletadedados.component.css']
})

export class AppcoletadedadosComponent implements OnInit {

  monitoramentos = [];
  avaliacoes= [];

  appColetaDeDadosSalvar = new AppColetaDeDados();

  constructor(
   
    private appmonitoramentoService: AppmonitoramentoService,
    private appAvaliacaoService: AppavaliacaoService,
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

  pesquisarAvaliacoesPorMonitoramento() {
      
    const filtro: AvaliacaoMonitoramentoFiltro = {
      cdMonitoramento: this.appColetaDeDadosSalvar.cdMonitoramento.cdMonitoramento
    }
    this.carregarAvalicao(this.appColetaDeDadosSalvar.cdMonitoramento.cdMonitoramento);
  
  }

  carregarAvalicao(cdMonitoramento:any) {
    return this.appAvaliacaoService.listarPorMonitoramento(cdMonitoramento)
      .then(avaliacoes => {
        this.avaliacoes = avaliacoes.map(c => ({ label: c.cdAvaliacao + " - " + c.nmAvaliacao, value: c.cdAvaliacao }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
