import { CadtipodeverificadorService } from './../cadtipodeverificador/cadtipodeverificador.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { VerificadorMService, CadverificadorFiltro } from './verificador-m.service';
import { Verificador_m, MenuEmpresa } from '../core/model';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { MenuService } from '../menu/menu.service';





@Component({
  selector: 'app-verificador-m',
  templateUrl: './verificador-m.component.html',
  styleUrls: ['./verificador-m.component.css']
})
export class VerificadorMComponent implements OnInit {

showSpinner = false;

  verificadorm = [];
  cadtipodeverificador = [];

  verificadorMSalvar = new Verificador_m;

  empresaSelecionada = new MenuEmpresa();

  filtro = new CadverificadorFiltro;

  @ViewChild('tabela') grid;
  constructor(
    private verificadorMService: VerificadorMService,
    private menuService: MenuService,
    private toasty: ToastyService,
    private tipoDeVerificadores: CadtipodeverificadorService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {

    this.carregarTipoDeVerificadores();

    // this.pesquisar();
    const codigoVerificadorM = this.route.snapshot.params['codigo'];

    //  se houver um id entra no metodo de carregar valores
    if (codigoVerificadorM) {
      this.carregarVerificadorM(codigoVerificadorM);
    }
  }

  get editando() {
    return Boolean(this.verificadorMSalvar.cdVerificador)
  }

  pesquisar() {
    
    return this.menuService.carregarEmpresaSelecionada()
    .then(empresaSelecionada => {
      this.empresaSelecionada.cdEmpresa = empresaSelecionada;
      const filtro: CadverificadorFiltro = {
        cdEmpresa: this.empresaSelecionada.cdEmpresa,
        cdTipoDeVerificador: this.verificadorMSalvar.cdTipoDeVerificador
      }
      this.verificadorMService.pesquisar(filtro)
        .then(modlocal2 => this.verificadorm = modlocal2);
      console.log(this.empresaSelecionada.cdEmpresa)
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTipoDeVerificadores() {
    return this.tipoDeVerificadores.listarTodas()
      .then(tipoDeVerificadores => {
        this.cadtipodeverificador = tipoDeVerificadores.map(c => ({ label: c.cdTipoDeVerificador + " - " + c.nmTipoDeVerificador, value: c.cdTipoDeVerificador }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  //Metodo para carregar valores
  carregarVerificadorM(codigo: number) {
    
    this.verificadorMService.buscarPorCodigo(codigo)
      .then(verificador => {
        this.verificadorMSalvar = verificador;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.verificadorMService.atualizar(this.verificadorMSalvar)
      .then(verificador => {
        this.verificadorMSalvar = verificador;

        this.toasty.success('Verificador alterado com sucesso!');

      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
