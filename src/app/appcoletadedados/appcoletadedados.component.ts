import { Component, OnInit, ViewChild } from '@angular/core';
import { AppmonitoramentoService } from '../appmonitoramento/appmonitoramento.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AppcoletadedadosService, AvaliacaoMonitoramentoFiltro, AvaliacaoFiltro} from './appcoletadedados.service';
import { AppColetaDeDados, MenuEmpresa } from '../core/model';
import { AppavaliacaoService, AppAvaliacaoFiltro } from '../appavaliacao/appavaliacao.service';
import { MenuService } from '../menu/menu.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-appcoletadedados',
  templateUrl: './appcoletadedados.component.html',
  styleUrls: ['./appcoletadedados.component.css']
})

export class AppcoletadedadosComponent implements OnInit {

  monitoramentos = [];
  avaliacoes= [];
  verificadores= [];
  appavaliacao = [];
  empresaSelecionada = new MenuEmpresa();
  appColetaDeDadosSalvar = new AppColetaDeDados();
  cdEmp: any;
  cdMon: any;
  cdAva: any;
  @ViewChild('tabela') grid;

  constructor(
    private router: Router,
    private appcoletadedadosService: AppcoletadedadosService,
    private appmonitoramentoService: AppmonitoramentoService,
    private menuService: MenuService,
    private appAvaliacaoService: AppavaliacaoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private apavaliacaoService: AppavaliacaoService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.carregarEmpresaSelecionada();
    this.carregarMonitoramentos();
    const codigoAppColetaDeDado = this.route.snapshot.params['codigo'];

    if (codigoAppColetaDeDado) {
      this.carregarAppColetaDeDado(codigoAppColetaDeDado);
    }
  }
  get editando() {
    return Boolean(this.appColetaDeDadosSalvar.cdColetaDeDaDos)
  }

  //Metodo para carregar valores
  carregarAppColetaDeDado(codigoAppColetaDeDado: number) {
    this.appcoletadedadosService.buscarPorCodigo(codigoAppColetaDeDado)
      .then(appColetaDeDados => {
        this.appColetaDeDadosSalvar = appColetaDeDados;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.appColetaDeDadosSalvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.cdEmp = this.appColetaDeDadosSalvar.cdEmpresa.cdEmpresa;
        console.log(this.empresaSelecionada.cdEmpresa)
        this.pesquisarPorAvaliacao()

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarPorAvaliacao() {
    this.cdAva = this.appColetaDeDadosSalvar.cdAvaliacao.cdAvaliacao;
    console.log("this.cdAva p: " + this.cdAva)
    console.log("this.cdEmp e: " + this.cdEmp)
    const filtro: AvaliacaoFiltro = {
      cdAvaliacao: this.cdAva,
      cdEmpresa: this.cdEmp
    }
    this.appcoletadedadosService.pesquisarPorAvaliacao(filtro)
      .then(verificadores => this.verificadores = verificadores)
      .catch(erro => this.errorHandler.handle(erro));



}


  carregarMonitoramentos() {
    return this.appmonitoramentoService.listarTodas()
      .then(monitoramentos => {
        this.monitoramentos = monitoramentos.map(c => ({ label: c.cdMonitoramento + " - " + c.nmMonitoramento, value: c.cdMonitoramento }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarAvaliacoesPorMonitoramento() {

    const filtro: AppAvaliacaoFiltro = {
      cdEmpresa: this.cdEmp,
      cdMonitoramento:  this.appColetaDeDadosSalvar.cdMonitoramento.cdMonitoramento,
      nmMonitoramento: this.appColetaDeDadosSalvar.cdMonitoramento.nmMonitoramento

    }
    this.apavaliacaoService.pesquisarMon(filtro)
      .then(appavaliacao => this.avaliacoes = appavaliacao.map(c => ({ label: c.cdAvaliacao + " - " + c.nmAvaliacao, value: c.cdAvaliacao })));
      this.cdMon = this.appColetaDeDadosSalvar.cdMonitoramento.cdMonitoramento;
  }
  carregarAvalicao(cdMonitoramento:any) {
    return this.appAvaliacaoService.listarPorMonitoramento(cdMonitoramento)
      .then(avaliacoes => {
        this.avaliacoes = avaliacoes.map(c => ({ label: c.cdAvaliacao + " - " + c.nmAvaliacao, value: c.cdAvaliacao }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {

    if (this.appColetaDeDadosSalvar.cdEmpresa.cdEmpresa != 1) {
      if (this.editando) {
        this.confirmarAlterar(form);
      } else {
        //this.confirmarSalvar(form);
      }
    } else {
      this.toasty.warning('Você não pode salvar dados na Empresa Exemplo!');
    }

  }

  confirmarAlterar(appcoletadedados: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarColeta(appcoletadedados);
      }
    });
  }

  atualizarColeta(form: FormControl) {
    this.appcoletadedadosService.atualizar(this.appColetaDeDadosSalvar)
      .then(appAvaliacao => {
        this.appColetaDeDadosSalvar = appAvaliacao;
        this.toasty.success('Coleta salva com sucesso!');
        this.pesquisarPorAvaliacao();
        this.router.navigate(['/appcoletadedados']);
          this.cdAva = this.cdAva;
              console.log("this.cdAva: " + this.cdAva)
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  exluirDados(verificadores:any){
      this.appAvaliacaoService.excluir(verificadores.cdColetaDeDaDos)
        .then(() => {
          if(this.grid.first === 0) {
            this.pesquisarPorAvaliacao();
          } else {
            this.grid.first = 0;
            this.pesquisarPorAvaliacao();
          }
          this.toasty.success('Aplicação excluída com sucesso!');
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(verificadores: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.exluirDados(verificadores);
      }
    });
  }


  sairDaEdicao() {
    this.router.navigate(['/appcoletadedados']);
}

}
