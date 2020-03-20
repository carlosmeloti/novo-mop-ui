import { Component, OnInit, ViewChild } from '@angular/core';
import { ModNivel3 } from '../core/model';
import { Modnivel1Service } from '../modnivel1/modnivel1.service';
import { Modnivel2Service } from '../modnivel2/modnivel2.service';
import { Modnivel3Service, Modnivel3Filtro, Filtro2 } from './modnivel3.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CadempresaService } from '../cadempresa/cadempresa.service';

@Component({
  selector: 'app-modnivel3',
  templateUrl: './modnivel3.component.html',
  styleUrls: ['./modnivel3.component.css']
})
export class Modnivel3Component implements OnInit {

  tatalRegistros = 0;
  filtro = new Modnivel3Filtro();
  filtro2 = new Filtro2()
  cdNivel1: number;
  cdNivel2: number;
  nmNivel3: string;
  modNivel3Salvar = new ModNivel3();

  empresas = [];

  @ViewChild('tabela') grid;

  modNivel1 = [];
  modNivel2 = [];
  modNivel3 = [];

  constructor(
    private modNivel1Service: Modnivel1Service,
    private modNivel2Service: Modnivel2Service,
    private modNivel3Service: Modnivel3Service,
    private cadEmpresaService: CadempresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.carregarModNivel1();
    this.carregarEmpresas();
    //console.log(this.route.snapshot.params['codigo']);

    const codigoModnivel3 = this.route.snapshot.params['codigo'];

    //se houver um id entra no metodo de carregar valores
    if (codigoModnivel3) {
      this.carregarModlocal3(codigoModnivel3);
    }
  }

  get editando() {
    return Boolean(this.modNivel3Salvar.cdNivel3)
  }

  //Metodo para carregar valores
  carregarModlocal3(codigo: number) {
    this.modNivel3Service.buscarPorCodigo(codigo)
      .then(modnivel3 => {
        this.modNivel3Salvar = modnivel3;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarNivel2() {

    const filtro2: Filtro2 = {
      cdNivel1: this.cdNivel1,
     
    }
         this.carregarNivel2(this.cdNivel1);
  }

  carregarNivel2(cdNivel1:any) {
    return this.modNivel2Service.listarPorNivel1(cdNivel1)
      .then(modNivel2 => {
        this.modNivel2 = modNivel2.map(c => ({ label: c.cdNivel2 + " - " + c.nmNivel2, value: c.cdNivel2 }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarNivel3() {

    const filtro: Modnivel3Filtro = {
      //cdNivel1: this.cdNivel1,
      cdNivel2: this.cdNivel2,
      nmNivel3: this.nmNivel3
    }
    this.modNivel3Service.pesquisarNivel3(filtro)
      .then(modNivel3 => this.modNivel3 = modNivel3);
  }
  


  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(modnivel3: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(modnivel3);
      }
    });
  }

  excluir(modnivel3: any) {

    this.modNivel3Service.excluir(modnivel3.cdNivel3)
      .then(() => {
        if (this.grid.first === 0) {
          //this.pesquisar();
        } else {
          this.grid.first = 0;
          // this.pesquisar();
        }
        this.toasty.success('Etapa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  salvar(modnivel3: any) {

    this.confirmation.confirm({
      message: 'Tem certeza que deseja salvar?',
      accept: () => {
        this.adicionarModNivel3(modnivel3);
      }
    });

  }



  adicionarModNivel3(form: FormControl) {
    this.modNivel3Service.adicionar(this.modNivel3Salvar)
      .then(() => {
        this.toasty.success("Local de Avaliação cadastrada com sucesso!");
        form.reset();
        this.modNivel3Salvar = new ModNivel3();
        //this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  carregarModNivel1() {
    return this.modNivel1Service.listarTodas()
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

}
