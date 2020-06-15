import { CadempresaService } from './../cadempresa/cadempresa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModNivel2, MenuEmpresa } from '../core/model';
import { Modnivel1Service } from '../modnivel1/modnivel1.service';
import { Modnivel2Service, Modnivel2Filtro } from './modnivel2.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-modnivel2',
  templateUrl: './modnivel2.component.html',
  styleUrls: ['./modnivel2.component.css']
})
export class Modnivel2Component implements OnInit {

  cdNiv1: any;
  cdNivel1: number;
  filtro = new Modnivel2Filtro();

  empresaSelecionada = new MenuEmpresa();
  modNivel2Salvar = new ModNivel2();

  empresas = [];

  @ViewChild('tabela') grid;

  modnivel1 = [];
  modnivel2 = [];

  constructor(
    private modNivel1Service: Modnivel1Service,
    private menuService: MenuService,
    private modNivel2Service: Modnivel2Service,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionada();
    this.carregarEmpresas();
   
    //console.log(this.route.snapshot.params['codigo']);

    const codigoModnivel2 = this.route.snapshot.params['codigo'];

    //se houver um id entra no metodo de carregar valores
    if (codigoModnivel2) {
      this.carregarModlocal2(codigoModnivel2);
    }
  }

  get editando() {
    return Boolean(this.modNivel2Salvar.cdNivel2)
  }

  //Metodo para carregar valores
  carregarModlocal2(codigo: number) {
    this.modNivel2Service.buscarPorCodigo(codigo)
      .then(modnivel2 => {
        this.modNivel2Salvar = modnivel2;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.modNivel2Salvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.carregarModNivel1(this.modNivel2Salvar.cdEmpresa.cdEmpresa);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarNivel2() {
    console.log("Empresa: " + this.empresaSelecionada.cdEmpresa)
    console.log("this.cdNiv1: " + this.cdNiv1)
    if(this.cdNiv1 != null) {
      const filtro: Modnivel2Filtro = {
        cdNivel1: this.cdNiv1,
        cdEmpresa: this.empresaSelecionada.cdEmpresa
      }
      this.modNivel2Service.pesquisarNivel2(filtro)
        .then(modnivel2 => this.modnivel2 = modnivel2);
        this.carregarEmpresaSelecionada();

    } else {
      const filtro: Modnivel2Filtro = {
        cdNivel1: this.modNivel2Salvar.cdNivel1.cdNivel1,
        cdEmpresa: this.empresaSelecionada.cdEmpresa
      }
      this.modNivel2Service.pesquisarNivel2(filtro)
        .then(modnivel2 => this.modnivel2 = modnivel2);
        this.carregarEmpresaSelecionada();
    }
  }

 

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(modnivel2: any) {
    if(modnivel2.cdEmpresa.cdEmpresa != 1){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(modnivel2);
        }
      })
    } else {
      this.toasty.warning('Você não pode excluir dados da Empresa Exemplo!');
    }
    
  }

  excluir(modnivel2: any) {
     this.modNivel2Service.excluir(modnivel2.cdNivel2)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisarNivel2();
        
        } else {
          this.grid.first = 0;
          this.pesquisarNivel2();
         
        }
        this.toasty.success('Etapa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
    
  salvar(modnivel2: any) {
    if(this.modNivel2Salvar.cdEmpresa.cdEmpresa != 1){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja salvar?',
        accept: () => {
          this.adicionarModNivel2(modnivel2);
         
        }
      });
    } else {
      this.toasty.warning('Você não pode salvar dados na Empresa Exemplo!');
    }
    
  }
  adicionarModNivel2(form: FormControl) {
    this.cdNiv1 = this.modNivel2Salvar.cdNivel1.cdNivel1;
    this.modNivel2Service.adicionar(this.modNivel2Salvar)
      .then(() => {
        this.toasty.success("Local de Avaliação cadastrada com sucesso!");
        form.reset();
        this.modNivel2Salvar = new ModNivel2();
        this.pesquisarNivel2();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  carregarModNivel1(cdEmpresa: any) {
    return this.modNivel1Service.listarTodas2(cdEmpresa)
      .then(modnivel1 => {
        this.modnivel1 = modnivel1.map(c => ({ label: c.cdNivel1 + " - " + c.nmNivel1, value: c.cdNivel1 }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
