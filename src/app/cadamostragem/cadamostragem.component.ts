import { Cadempresa } from './../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadamostragemService, CadamostragemFiltro } from './cadamostragem.service';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Cadamostragem } from '../core/model';
import { FormControl } from '@angular/forms';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadamostragem',
  templateUrl: './cadamostragem.component.html',
  styleUrls: ['./cadamostragem.component.css']
})
export class CadamostragemComponent {

  tatalRegistros = 0;
  filtro = new CadamostragemFiltro();
  nmAmostragem: string;
  cdEmpresa: number;

  amostragemSalvar = new Cadamostragem();
  cadamostragem = [];

  empresas = [];


  @ViewChild('tabela') grid;

  constructor(
    private cadamostragemService: CadamostragemService,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService


  ) { }

  ngOnInit() {

    this.carregarEmpresas();
    const codigoAmostragem = this.route.snapshot.params['codigo'];


    if (codigoAmostragem) {
      this.carregarAmostragem(codigoAmostragem);
    }
  }

  get editando() {
    return Boolean(this.amostragemSalvar.cdAmostragem)
  }

  //Metodo para carregar valores
  carregarAmostragem(cdAmostragem: number) {
    this.cadamostragemService.buscarPorCodigo(cdAmostragem)
      .then(amostragem => {
        this.amostragemSalvar = amostragem;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar() {

    const filtro: CadamostragemFiltro = {
      cdEmpresa: this.amostragemSalvar.cdEmpresa.cdEmpresa,
      }
    this.cadamostragemService.pesquisar(filtro)
      .then(amostragem => this.cadamostragem = amostragem)
      .catch(erro => this.errorHandler.handle(erro));
   

    //this.cadamostragemService.pesquisar(this.filtro)
     // .then(resultado => {
      //  this.tatalRegistros = resultado.total;
      //  this.cadamostragem = resultado.cadamostragem;

      //})
      //.catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(amostragem: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(amostragem);
      }
    });
  }

  excluir(amostragem: any) {

    this.cadamostragemService.excluir(amostragem.cdAmostragem)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }
        this.toasty.success('Amostragem excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  salvar(form: FormControl) {

    if (this.editando) {
      this.confirmarAlterar(form);
    } else {
      this.confirmarSalvar(form);
    }

  }


  confirmarSalvar(amostragem: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja salvar?',
      accept: () => {
        this.adicionarAmostragem(amostragem);
      }
    });
  }

  confirmarAlterar(amostragem: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarAmostragem(amostragem);
      }
    });
  }

  adicionarAmostragem(form: FormControl) {
    this.cadamostragemService.adicionar(this.amostragemSalvar)
      .then(() => {
        this.toasty.success("Amostragem cadastrada com sucesso!");
        form.reset();
        this.amostragemSalvar = new Cadamostragem();
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAmostragem(form: FormControl) {
    this.cadamostragemService.atualizar(this.amostragemSalvar)
      .then(amostragem => {
        this.amostragemSalvar = amostragem;

        this.toasty.success('Amostragem alterada com sucesso!');

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

 /* carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.cdEmpresa.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
 } */

  carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
