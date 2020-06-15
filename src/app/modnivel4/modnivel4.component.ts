import { Component, OnInit, ViewChild } from '@angular/core';
import { Modnivel1Service } from '../modnivel1/modnivel1.service';
import { Modnivel2Service } from '../modnivel2/modnivel2.service';
import { Modnivel3Service } from '../modnivel3/modnivel3.service';
import { Modnivel4Service,Filtro2, Filtro3, Modnivel4Filtro } from './modnivel4.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ModNivel4, MenuEmpresa } from '../core/model';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-modnivel4',
  templateUrl: './modnivel4.component.html',
  styleUrls: ['./modnivel4.component.css']
})
export class Modnivel4Component implements OnInit {

  cdNiv1: any;
  cdNiv2: any;
  cdNiv3: any;
  tatalRegistros = 0;
  filtro = new Modnivel4Filtro();
  filtro2 = new Filtro2();
  filtro3 = new Filtro3();
  cdNivel1:number;
  cdNivel2:number;
  cdNivel3:number;
  nmNivel3:string;
  nmNivel4:string;
  empresaSelecionada = new MenuEmpresa();

  modNivel4Salvar = new ModNivel4();

  empresas = [];

  @ViewChild('tabela') grid;

  modNivel1 = [];
  modNivel2 = [];
  modNivel3 = [];
  modNivel4 = [];

  constructor(
    private modNivel1Service: Modnivel1Service,
    private menuService: MenuService,
    private modNivel2Service: Modnivel2Service,
    private modNivel3Service: Modnivel3Service,
    private modNivel4Service: Modnivel4Service,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.carregarEmpresas();
    this.carregarEmpresaSelecionada();
    const codigoModnivel4 = this.route.snapshot.params['codigo'];

    //se houver um id entra no metodo de carregar valores
    if (codigoModnivel4) {
      this.carregarModNivel4(codigoModnivel4);
    }
  }

  get editando() {
    return Boolean(this.modNivel4Salvar.cdNivel4)
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.modNivel4Salvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.carregarModNivel1(this.modNivel4Salvar.cdEmpresa.cdEmpresa);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  //Metodo para carregar valores
  carregarModNivel4(codigo: number) {
    this.modNivel4Service.buscarPorCodigo(codigo)
      .then(modnivel4 => {
        this.modNivel4Salvar = modnivel4;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarNivel2() {

    const filtroN2: Filtro2 = {
      cdNivel1: this.modNivel4Salvar.cdNivel1.cdNivel1,
      cdEmpresa: this.modNivel4Salvar.cdEmpresa.cdEmpresa,
    }
    this.modNivel2Service.pesquisarNivel2(filtroN2)
      .then(modNivel2 =>  this.modNivel2 = modNivel2.map(c => ({ label: c.cdNivel2 + " - " + c.nmNivel2, value: c.cdNivel2 })));
        
  }  

  pesquisarNivel3() {

    const filtroN3: Filtro3 = {
      cdNivel1: this.modNivel4Salvar.cdNivel1.cdNivel1,
      cdNivel2: this.modNivel4Salvar.cdNivel2.cdNivel2,
      nmNivel3: this.modNivel4Salvar.cdNivel3.nmNivel3,
      cdEmpresa: this.modNivel4Salvar.cdEmpresa.cdEmpresa,
    }
    this.modNivel3Service.pesquisarNivel3(filtroN3)
      .then(modNivel3 =>  this.modNivel3 = modNivel3.map(c => ({ label: c.cdNivel3 + " - " + c.nmNivel3, value: c.cdNivel3 })));
        
  }  


  pesquisarNivel4() {
    console.log("this.cdNiv1:" + this.cdNiv1);
    console.log("this.cdNiv2" + this.cdNiv2);
    console.log("this.cdNiv3" + this.cdNiv3);

    if(this.cdNiv1 != null && this.cdNiv2 != null && this.cdNiv3 != null){
      const filtro: Modnivel4Filtro = {
        cdEmpresa: this.modNivel4Salvar.cdEmpresa.cdEmpresa,
        cdNivel1: this.cdNiv1,
        cdNivel2: this.cdNiv2,
        cdNivel3: this.cdNiv3,
        nmNivel4: this.modNivel4Salvar.nmNivel4
      }
      this.modNivel4Service.pesquisarNivel4(filtro)
        .then(modNivel4 => this.modNivel4 = modNivel4);
    } else{
      const filtro: Modnivel4Filtro = {
        cdEmpresa: this.modNivel4Salvar.cdEmpresa.cdEmpresa,
        cdNivel1: this.modNivel4Salvar.cdNivel1.cdNivel1,
        cdNivel2: this.modNivel4Salvar.cdNivel2.cdNivel2,
        cdNivel3: this.modNivel4Salvar.cdNivel3.cdNivel3,
        nmNivel4: this.modNivel4Salvar.nmNivel4
      }
      this.modNivel4Service.pesquisarNivel4(filtro)
        .then(modNivel4 => this.modNivel4 = modNivel4);
    }
    
  }

 
  carregarNivel3(cdNivel2:any) {
    return this.modNivel3Service.listarPorNivel2(cdNivel2)
      .then(modNivel3 => {
        this.modNivel3 = modNivel3.map(c => ({ label: c.cdNivel3 + " - " + c.nmNivel3, value: c.cdNivel3 }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarModNivel1(cdEmpresa: any) {
    return this.modNivel1Service.listarTodas2(cdEmpresa)
      .then(modnivel1 => {
        this.modNivel1 = modnivel1.map(c => ({ label: c.cdNivel1 + " - " + c.nmNivel1, value: c.cdNivel1 }));
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

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(modnivel4: any) {
    if(modnivel4.cdNivel1.cdEmpresa.cdEmpresa != 1){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(modnivel4);
        }
      });
    }else {
      this.toasty.warning('Você não pode excluir dados da Empresa Exemplo!');
    }
    
  }

  excluir(modnivel4: any) {
    this.cdNiv1 = this.modNivel4Salvar.cdNivel1.cdNivel1;
    this.cdNiv2 = this.modNivel4Salvar.cdNivel2.cdNivel2;
    this.cdNiv3 = this.modNivel4Salvar.cdNivel3.cdNivel3;
    this.modNivel4Service.excluir(modnivel4.cdNivel4)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisarNivel4();
        } else {
          this.grid.first = 0;
          this.pesquisarNivel4();
        }
        this.toasty.success('Etapa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  salvar(modnivel4: any) {
    if(this.modNivel4Salvar.cdEmpresa.cdEmpresa != 1) {
      this.confirmation.confirm({
        message: 'Tem certeza que deseja salvar?',
        accept: () => {
          this.adicionarModNivel4(modnivel4);
        }
      });
    }else {
      this.toasty.warning('Você não pode salvar dados na Empresa Exemplo!');
    }
    }



  adicionarModNivel4(form: FormControl) {
    this.cdNiv1 = this.modNivel4Salvar.cdNivel1.cdNivel1;
    this.cdNiv2 = this.modNivel4Salvar.cdNivel2.cdNivel2;
    this.cdNiv3 = this.modNivel4Salvar.cdNivel3.cdNivel3;
    this.modNivel4Service.adicionar(this.modNivel4Salvar)
      .then(() => {
        this.toasty.success("Subitem cadastrado com sucesso!");
        form.reset();
        this.modNivel4Salvar = new ModNivel4();
        this.pesquisarNivel4();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
