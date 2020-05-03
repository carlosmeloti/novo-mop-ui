import { Verificador_m, Verificador_Local_m, Cadtipodemetodo, MenuEmpresa } from './../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadtipodeverificadorService } from './../cadtipodeverificador/cadtipodeverificador.service';

import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';

import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { CadverificadorLocalFiltro, AssociarverificadorService, FiltroModelosPorTipo2, FiltroLocal2, subLocalFiltro2 } from './associarverificador.service';
import { VerificadorMService } from '../verificador-m/verificador-m.service';
import { CadtipodemetodoService } from '../cadtipodemetodo/cadtipodemetodo.service';
import { CadamostragemService } from '../cadamostragem/cadamostragem.service';
import { CadfrequenciaService } from '../cadfrequencia/cadfrequencia.service';
import { Modlocal1Service } from '../modlocal1/modlocal1.service';
import { Modlocal2Service } from '../modlocal2/modlocal2.service';
import { UnidadelocalsublocalService } from '../unidadelocalsublocal/unidadelocalsublocal.service';
import { CadmaterialService } from '../cadmaterial/cadmaterial.service';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-associarverificador',
  templateUrl: './associarverificador.component.html',
  styleUrls: ['./associarverificador.component.css']
})
export class AssociarverificadorComponent implements OnInit {

  verificadorlocalm = [];
  verificadorM = [];
  cadtipodeverificador = [];
  cadtipodemetodo = [];
  cadamostragem = [];
  cadfrequencia = [];
  modlocal1 = [];
  modlocal2 = [];
  modlocal3 = [];
  cadmaterial = [];
  cadmaterial2 = [];
  cadmaterial3 = [];
  cadTipoDeVerificador = [];
  cdLocal1:number;
  cdLocal2:number;
  nmLocal3:string;
  associarVerificadorSalvar = new Verificador_Local_m;
  empresaSelecionada = new MenuEmpresa();

  filtro = new CadverificadorLocalFiltro;

  @ViewChild('tabela') grid;
  constructor(

    private associarverificadorService: AssociarverificadorService,
    private unidadelocalsublocalService: UnidadelocalsublocalService,
    private cadMaterialService: CadmaterialService,
    private verificadorMService: VerificadorMService,
    private menuService: MenuService,
    private toasty: ToastyService,
    private modLocal1Service: Modlocal1Service,
    private modLocal2Service: Modlocal2Service,
    private cadTipoDeVerificadorService: CadtipodeverificadorService,
    private amostragem: CadamostragemService,
    private frequencia: CadfrequenciaService,
    private tipoDeMetodo: CadtipodemetodoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {
    this.carregarTipoVerificadores();
    this.carregarUnidadeDeAvaliacao();
    const codigoVerificadorLocalM = this.route.snapshot.params['codigo'];
    //  se houver um id entra no metodo de carregar valores
    if (codigoVerificadorLocalM) {
    //  this.carregarVerificadorLocalM(codigoVerificadorLocalM);
    }
  }

  carregarTipoVerificadores() {
    return this.cadTipoDeVerificadorService.listarTodas()
      .then(cadTipoDeVerificador => {
        this.cadTipoDeVerificador = cadTipoDeVerificador.map(c => ({ label: c.cdTipoDeVerificador + " - " + c.nmTipoDeVerificador, value: c.cdTipoDeVerificador }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarVerificadoresPorTipo(cdTipoDeVerificador: any) {
    return this.verificadorMService.listarPorTipo(cdTipoDeVerificador)
    .then(verificadorM => {
      this.verificadorM = verificadorM.map(c => ({ label: c.codalfa + " - " + c.sigla + " - " + c.nmVerificador, value: c.cdVerificador }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarModelosPorTipo() {

    const filtroModelosPorTipo: FiltroModelosPorTipo2 = {
      cdTipoDeVerificador: this.associarVerificadorSalvar.cdTipoDeVerificador.cdTipoDeVerificador,
      
    }
  //  this.carregarModelosPorTipo(this.verificadoresDoModeloSalvar.cdTipoDeVerificador.cdTipoDeVerificador);  
    this.carregarVerificadoresPorTipo(this.associarVerificadorSalvar.cdTipoDeVerificador.cdTipoDeVerificador);
   // this.carregarModNivel1();
  }

  carregarUnidadeDeAvaliacao() {
    return this.modLocal1Service.listarTodas()
      .then(modlocal1 => {
        this.modlocal1 = modlocal1.map(c => ({ label: c.cdLocal1 + " - " + c.nmlocal1, value: c.cdLocal1 }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarLocal2() {

    const filtro3: FiltroLocal2 = {
      cdLocal1: this.cdLocal1,
     
    }
         this.carregarLocal2(this.cdLocal1);
  }

  carregarLocal2(cdLocal1:any) {
    return this.modLocal2Service.listarPorLocal1(cdLocal1)
      .then(modlocal2 => {
        this.modlocal2 = modlocal2.map(c => ({ label: c.cdLocal2 + " - " + c.nmLocal2, value: c.cdLocal2 }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarSubLocal() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        const filtro2: subLocalFiltro2 = {
          cdEmpresa: this.empresaSelecionada.cdEmpresa,
          cdLocal1: this.cdLocal1,
          cdLocal2: this.cdLocal2,
          nmLocal3: this.nmLocal3
        }
        this.unidadelocalsublocalService.pesquisarSubLocal(filtro2)
          .then(modlocal3 => {
            this.modlocal3 = modlocal3.map(c => ({ label: c.cdLocal3 + " - " + c.nmLocal3, value: c.cdLocal3 }));
          })
        console.log(this.empresaSelecionada.cdEmpresa)
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


   

    



}
