import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Modlocal2Filtro, Modlocal2Service, Modlocal2Filtro2 } from './modlocal2.service';
import { Modlocal2, MenuEmpresa } from '../core/model';
import { Modlocal1Service } from '../modlocal1/modlocal1.service';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-modlocal2',
  templateUrl: './modlocal2.component.html',
  styleUrls: ['./modlocal2.component.css']
})
export class Modlocal2Component {

  tatalRegistros = 0;
  filtro = new Modlocal2Filtro();
  cdLocal1: number;
  nmLocal2: string;
  empresaSelecionada = new MenuEmpresa();
  modLocal2Salvar = new Modlocal2();

  empresas = [
    { label: 'Exemplo', value: 1 }
  ];

  @ViewChild('tabela') grid;

  modlocal1 = [];
  modlocal2 = [];

  constructor(
    private modLocal1Service: Modlocal1Service,
    private menuService: MenuService,
    private modLocal2Service: Modlocal2Service,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.carregarUnidadeDeAvaliacao();
    //console.log(this.route.snapshot.params['codigo']);

    const codigoModlocal2 = this.route.snapshot.params['codigo'];

    //se houver um id entra no metodo de carregar valores
    if (codigoModlocal2) {
      this.carregarModlocal2(codigoModlocal2);
    }
  }

  get editando() {
    return Boolean(this.modLocal2Salvar.cdLocal2)
  }

  //Metodo para carregar valores
  carregarModlocal2(codigo: number) {
    this.modLocal2Service.buscarPorCodigo(codigo)
      .then(modlocal2 => {
        this.modLocal2Salvar = modlocal2;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarModlocal2() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        const filtro: Modlocal2Filtro = {
          cdEmpresa: this.empresaSelecionada.cdEmpresa,
          cdLocal1: this.modLocal2Salvar.cdLocal1.cdLocal1,
          nmLocal2: this.modLocal2Salvar.nmLocal2
        }
        this.modLocal2Service.pesquisarModlocal2(filtro)
          .then(modlocal2 => this.modlocal2 = modlocal2);
          this.modLocal2Salvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(modlocal2: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(modlocal2);
      }
    });
  }

  excluir(modlocal2: any) {

    this.modLocal2Service.excluir(modlocal2.cdLocal2)
      .then(() => {
        if (this.grid.first === 0) {
          //this.pesquisar();
        } else {
          this.grid.first = 0;
          // this.pesquisar();
        }
        this.toasty.success('Local de Avaliação excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  salvar(modlocal2: any) {

    this.confirmation.confirm({
      message: 'Tem certeza que deseja salvar?',
      accept: () => {
        this.adicionarModLocal2(modlocal2);
      }
    });

  }

  carregarUnidadeDeAvaliacao() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.modLocal1Service.pesquisar2(this.empresaSelecionada.cdEmpresa) 
        .then(modlocal1 => {
            this.modlocal1 = modlocal1.map(c => ({ label: c.cdLocal1 + " - " + c.nmlocal1, value: c.cdLocal1 }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      })
  }



  adicionarModLocal2(form: FormControl) {
    this.modLocal2Service.adicionar(this.modLocal2Salvar)
      .then(() => {
        this.toasty.success("Local de Avaliação cadastrado com sucesso!");
        form.reset();
        this.modLocal2Salvar = new Modlocal2();


      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  }