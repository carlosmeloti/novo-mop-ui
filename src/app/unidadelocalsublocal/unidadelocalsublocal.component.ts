import { Component, ViewChild, OnInit } from '@angular/core';
import { SelectItem, TreeNode, LazyLoadEvent, ConfirmationService } from 'primeng/primeng';
import { NodeService } from 'src/service/nodeservice';
import { Modlocal1Service } from '../modlocal1/modlocal1.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Modlocal3, MenuEmpresa } from '../core/model';
import { Modlocal3Filtro, UnidadelocalsublocalService, subLocalFiltro, Filtro3} from './unidadelocalsublocal.service';
import { Modlocal2Service, filtroAvaliacao } from '../modlocal2/modlocal2.service';
import { ActivatedRoute } from '@angular/router';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';
import { MenuService } from '../menu/menu.service';



interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-unidadelocalsublocal',
  templateUrl: './unidadelocalsublocal.component.html',
  styleUrls: ['./unidadelocalsublocal.component.css']
})
export class UnidadelocalsublocalComponent implements OnInit {


  cities1: SelectItem[];
  selectedCity1: City;

  files: TreeNode[];

  tatalRegistros = 0;
  filtro = new Modlocal3Filtro();
  filtro2 = new subLocalFiltro();
  filtro3 = new Filtro3();
  cdLocal1:number;
  empresaSelecionada = new MenuEmpresa();
  cdLocal2: number;
  nmLocal3: string;


  modLocal3Salvar = new Modlocal3();

  empresas = [];

  @ViewChild('tabela') grid;

  modlocal1 = [];
  modlocal2 = [];
  modlocal3 = [];



  constructor(
    private nodeService: NodeService,
    private menuService: MenuService,
    private cadEmpresaService: CadempresaService,
    private modLocal1Service: Modlocal1Service,
    private modLocal2Service: Modlocal2Service,
    private errorHandler: ErrorHandlerService,
    private unidadelocalsublocalService: UnidadelocalsublocalService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
  ) { }



  ngOnInit() {
    this.nodeService.getFiles().then(files => this.files = files);
    this.carregarUnidadeDeAvaliacao();
    this.carregarEmpresas();
    const codigoModlocal3 = this.route.snapshot.params['codigo'];
    //se houver um id entra no metodo de carregar valores
      if (codigoModlocal3) {
        this.carregarModlocal3(codigoModlocal3);
      }
  }

  get editando() {
    return Boolean(this.modLocal3Salvar.cdLocal3)
  }

  //Metodo para carregar valores
  carregarModlocal3(codigo: number) {
    this.unidadelocalsublocalService.buscarPorCodigo(codigo)
      .then(modlocal3 => {
        this.modLocal3Salvar = modlocal3;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarLocal2() {

    const filtro3: Filtro3 = {
      cdLocal1: this.modLocal3Salvar.cdLocal1.cdLocal1,
     
    }
         this.carregarLocal2();
  }

  carregarLocal2() {
    return this.menuService.carregarEmpresaSelecionada()
    .then(empresaSelecionada => {
      this.empresaSelecionada.cdEmpresa = empresaSelecionada;
      const filtro: filtroAvaliacao = {
        cdEmpresa: this.empresaSelecionada.cdEmpresa,
        cdLocal1: this.cdLocal1,

      }
      this.modLocal2Service.listarPorLocal1Filtro(filtro) 
      .then(modlocal2 => {
        this.modlocal2 = modlocal2.map(c => ({ label: c.cdLocal2 + " - " + c.nmLocal2, value: c.cdLocal2 }));
      })
      .catch(erro => this.errorHandler.handle(erro));
    })
  }

  pesquisarSubLocal() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        const filtro2: subLocalFiltro = {
          cdEmpresa: this.empresaSelecionada.cdEmpresa,
          cdLocal1:  this.modLocal3Salvar.cdLocal1.cdLocal1,
          cdLocal2:  this.modLocal3Salvar.cdLocal2.cdLocal2,
          nmLocal3:  this.modLocal3Salvar.nmLocal3
        }
        this.unidadelocalsublocalService.pesquisarSubLocal(filtro2)
          .then(modlocal3 => this.modlocal3 = modlocal3);
        this.modLocal3Salvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
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

  



  carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(unidadelocalsublocalService: any) {

    this.modLocal2Service.excluir(unidadelocalsublocalService.cdLocal3)
      .then(() => {
        if (this.grid.first === 0) {
          //this.pesquisar();
        } else {
          this.grid.first = 0;
          // this.pesquisar();
        }
        this.toasty.success('Local 3 excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  salvar(unidadelocalsublocalService: any) {

    this.confirmation.confirm({
      message: 'Tem certeza que deseja salvar?',
      accept: () => {
        this.adicionarModLocal3(unidadelocalsublocalService);
      }
    });

  }

  confirmarExclusao(modlocal3: any) {
    this.confirmation.confirm( {
      message: 'Tem certeza que deseja excluir?',
      accept: () =>{
        this.excluir(modlocal3);
      }
    });
  }






  adicionarModLocal3(form: FormControl) {
    this.unidadelocalsublocalService.adicionar(this.modLocal3Salvar)
      .then(() => {
        this.toasty.success("Local de Avaliação cadastrado com sucesso!");
        form.reset();
        this.modLocal3Salvar = new Modlocal3();


      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }



}

