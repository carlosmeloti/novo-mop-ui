import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuempresaService, MenuempresaFiltro } from './menuempresa.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { MenuEmpresa } from '../core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-menuempresa',
  templateUrl: './menuempresa.component.html',
  styleUrls: ['./menuempresa.component.css']
})
export class MenuempresaComponent implements OnInit {

 
  tatalRegistros = 0;
  filtro = new MenuempresaFiltro();
  nmEmpresa: string;

  empresas = [];
  menuempresasSalvar = new MenuEmpresa();
  @ViewChild('tabela') grid;


  constructor(
    private menuempresaService: MenuempresaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {

 
    
   // this.pesquisar();
   const codigoEmpresa = this.route.snapshot.params['codigo'];

   //se houver um id entra no metodo de carregar valores
   if(codigoEmpresa){
      this.carregarEmpresa(codigoEmpresa);
   }


  }

  get editando(){
    return Boolean(this.menuempresasSalvar.cdEmpresa)
  }
//Metodo para carregar valores
  carregarEmpresa(cdEmpresa: number){
    this.menuempresaService.buscarPorCodigo(cdEmpresa)
      .then(empresa => {
        this.menuempresasSalvar = empresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar(page = 0){

    this.filtro.page = page;

    this.menuempresaService.pesquisar(this.filtro)
      .then(resultado => {
        this.tatalRegistros = resultado.total;
        this.empresas = resultado.cadempresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }



    aoMudarPagina(event: LazyLoadEvent){
      const page = event.first / event.rows;
      this.pesquisar(page);
    }


    excluir(empresa: any){

      this.menuempresaService.excluir(empresa.cdEmpresa)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }
        this.toasty.success('Empresa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

    }

    salvar(form: FormControl){

      if(this.editando){
        this.confirmarAlterar(form);
      } else {
        this.confirmarSalvar(form);
      }

    }
        confirmarExclusao(empresa: any) {
          this.confirmation.confirm( {
            message: 'Tem certeza que deseja excluir?',
            accept: () =>{
              this.excluir(empresa);
            }
          });
        }

        confirmarSalvar(empresa: any) {
          this.confirmation.confirm( {
            message: 'Tem certeza que deseja salvar?',
            accept: () =>{
              this.adicionarEmpresa(empresa);
            }
          });
        }

        confirmarAlterar(empresa: any) {
          this.confirmation.confirm( {
            message: 'Tem certeza que deseja alterar?',
            accept: () =>{
              this.atualizarEmpresa(empresa);
            }
          });
        }

  adicionarEmpresa(form: FormControl){
    this.menuempresaService.adicionar(this.menuempresasSalvar)
      .then(() => {
        this.toasty.success("Empresa cadastrada com sucesso!");
        form.reset();
        this.menuempresasSalvar = new MenuEmpresa();
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEmpresa(form: FormControl){
    this.menuempresaService.atualizar(this.menuempresasSalvar)
    .then(empresa => {
      this.menuempresasSalvar = empresa;

      this.toasty.success('Empresa alterada com sucesso!');

    })
  .catch(erro => this.errorHandler.handle(erro));
  }

  }
