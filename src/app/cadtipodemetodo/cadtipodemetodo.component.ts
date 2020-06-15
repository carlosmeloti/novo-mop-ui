import { Component, OnInit, ViewChild } from '@angular/core';
import { CadtipodemetodoFiltro, CadtipodemetodoService } from './cadtipodemetodo.service';
import { Cadtipodemetodo, MenuEmpresa } from '../core/model';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-cadtipodemetodo',
  templateUrl: './cadtipodemetodo.component.html',
  styleUrls: ['./cadtipodemetodo.component.css']
})
export class CadtipodemetodoComponent {

  tatalRegistros = 0;
  filtro = new CadtipodemetodoFiltro();
  nmFrequencia: string;
  cdEmpresa: number;
  cdEmp:any;
  tipodemetodoSalvar = new Cadtipodemetodo();
  empresas = [];
  @ViewChild('tabela') grid;

  cadtipodemetodo = []
  
  
  empresaSelecionada = new MenuEmpresa();

  constructor(
    private cadtipodemetodoService: CadtipodemetodoService,
    private menuService: MenuService,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    //console.log(this.route.snapshot.params['codigo']);
    this.carregarEmpresaSelecionada();
    const codigoTipoDeMetodo = this.route.snapshot.params['codigo'];

    //se houver um id entra no metodo de carregar valores
    if (codigoTipoDeMetodo) {
      this.carregarTipoDeMetodo(codigoTipoDeMetodo);
    }

  }

  get editando() {
    return Boolean(this.tipodemetodoSalvar.cdTipoDeMetodo)
  }

  //Metodo para carregar valores
  carregarTipoDeMetodo(codigo: number) {
    this.cadtipodemetodoService.buscarPorCodigo(codigo)
      .then(tipodemetodo => {
        this.tipodemetodoSalvar = tipodemetodo;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
        this.tipodemetodoSalvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.cdEmp = this.tipodemetodoSalvar.cdEmpresa.cdEmpresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar2(cdEmpresa) {
    this.cadtipodemetodoService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.cadtipodemetodo  = empresaSelecionada);
  }


  pesquisar() {

    const filtro: CadtipodemetodoFiltro = {
      cdEmpresa: this.cdEmp,
      }
    this.cadtipodemetodoService.pesquisar(filtro)
      .then(tipometodo => this.cadtipodemetodo = tipometodo)
      .catch(erro => this.errorHandler.handle(erro));
   
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(tipodemetodo: any) {
    if(tipodemetodo.cdEmpresa.cdEmpresa != 1){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(tipodemetodo);
        }
      })
    }else {
        this.toasty.warning('Você não pode excluir dados da Empresa Exemplo!');
      }
  }

  excluir(tipometodo: any) {

    this.cadtipodemetodoService.excluir(tipometodo.cdTipoDeMetodo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }
        this.toasty.success('Frequencia excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  salvar(form: FormControl) {
    if(this.tipodemetodoSalvar.cdEmpresa.cdEmpresa != 1){
      if (this.editando) {
        this.confirmarAlterar(form);
      } else {
        this.confirmarSalvar(form);
      }
    }else {
      this.toasty.warning('Você não pode salvar dados na Empresa Exemplo!');
    }

  }


  confirmarSalvar(tipodemetodo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja salvar?',
      accept: () => {
        this.adicionarTipoDeMetodo(tipodemetodo);
      }
    });
  }

  confirmarAlterar(tipodemetodo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarTipoDeMetodo(tipodemetodo);
      }
    });
  }

  adicionarTipoDeMetodo(form: FormControl) {
   this.tipodemetodoSalvar.cdEmpresa.cdEmpresa = this.cdEmp;
    this.cadtipodemetodoService.adicionar(this.tipodemetodoSalvar)
      .then(() => {
        this.toasty.success("Tipo de metodo cadastrado com sucesso!");
        form.reset();
        this.tipodemetodoSalvar = new Cadtipodemetodo();
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTipoDeMetodo(form: FormControl) {
    this.cadtipodemetodoService.atualizar(this.tipodemetodoSalvar)
      .then(tipodemetodo => {
        this.tipodemetodoSalvar = tipodemetodo;

        this.toasty.success('Tipo de metodo alterado com sucesso!');

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
