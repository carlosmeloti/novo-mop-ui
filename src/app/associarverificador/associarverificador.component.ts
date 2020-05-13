import { Verificador_m, Verificador_Local_m, Cadtipodemetodo, MenuEmpresa } from './../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadtipodeverificadorService } from './../cadtipodeverificador/cadtipodeverificador.service';

import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { FieldsetModule } from 'primeng/fieldset';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { CadverificadorLocalFiltro, AssociarverificadorService, FiltroModelosPorTipo2, FiltroLocal2, subLocalFiltro2, filtroPesquisa } from './associarverificador.service';
import { VerificadorMService } from '../verificador-m/verificador-m.service';
import { CadtipodemetodoService } from '../cadtipodemetodo/cadtipodemetodo.service';
import { CadamostragemService } from '../cadamostragem/cadamostragem.service';
import { CadfrequenciaService } from '../cadfrequencia/cadfrequencia.service';
import { Modlocal1Service } from '../modlocal1/modlocal1.service';
import { Modlocal2Service, filtroAvaliacao } from '../modlocal2/modlocal2.service';
import { UnidadelocalsublocalService, Filtro3 } from '../unidadelocalsublocal/unidadelocalsublocal.service';
import { CadmaterialService } from '../cadmaterial/cadmaterial.service';
import { MenuService } from '../menu/menu.service';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-associarverificador',
  templateUrl: './associarverificador.component.html',
  styleUrls: ['./associarverificador.component.css']
})
export class AssociarverificadorComponent implements OnInit {

  verificadorlocalm = [];
  verificadorlocalm2 = [];
  verificadorM = [];
  cadtipodeverificador = [];
  cadtipodemetodo = [];
  cadamostragem = [];
  cadfrequencia = [];
  modlocal1 = [];
  modlocal2 = [];
  modlocal3 = [];
  cadmaterial = [];
  cadTipoDeVerificador = [];
  codigo: number;
  cdLocal1: number;
  cdLocal2: number;
  nmLocal3: string;
  associarVerificadorSalvar = new Verificador_Local_m;
  empresaSelecionada = new MenuEmpresa();

  filtro = new CadverificadorLocalFiltro;

  @ViewChild('tabela') grid;
  constructor(

    private associarverificadorService: AssociarverificadorService,
    private cadTipoDeMetodo: CadtipodemetodoService,
    private unidadelocalsublocalService: UnidadelocalsublocalService,
    private cadMaterialService: CadmaterialService,
    private verificadorMService: VerificadorMService,
    private menuService: MenuService,
    private toasty: ToastyService,
    private modLocal1Service: Modlocal1Service,
    private modLocal2Service: Modlocal2Service,
    private cadTipoDeVerificadorService: CadtipodeverificadorService,
    private cadAmostragem: CadamostragemService,
    private cadFrequencia: CadfrequenciaService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {
    this.carregarTipoVerificadores();
    this.carregarUnidadeDeAvaliacao();
    this.carregarTipoDeMetodo();
    this.carregarFrequencia();
    this.carregarAmostragem();
    this.carregarMateriais();
    const codigoVerificadorLocalM = this.route.snapshot.params['codigo'];

     //se houver um id entra no metodo de carregar valores
     if (codigoVerificadorLocalM) {
       
      this.carregarValores(codigoVerificadorLocalM);
      
    }
  }

  teste(){
    console.log("teste: " + this.associarVerificadorSalvar.cdLocal1.cdLocal1);
  }

  carregarValores(codigo: number) {
    this.associarverificadorService.buscarPorCodigo(codigo)
      .then(verificadorlocalm => {
        this.associarVerificadorSalvar = verificadorlocalm;
        this.carregarVerificadoresPorTipo(this.associarVerificadorSalvar.cdTipoDeVerificador.cdTipoDeVerificador);
        this.pesquisarLocal2();
        this.pesquisarSubLocal();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  carregarTipoVerificadores() {
    return this.cadTipoDeVerificadorService.listarTodas()
      .then(cadTipoDeVerificador => {
        this.cadTipoDeVerificador = cadTipoDeVerificador.map(c => ({ label: c.cdTipoDeVerificador + " - " + c.nmTipoDeVerificador, value: c.cdTipoDeVerificador }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTipoDeMetodo() {
    this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.cadTipoDeMetodo.listarTodas(this.empresaSelecionada.cdEmpresa)
          .then(cadTipoDeMetodo => {
            this.cadTipoDeMetodo = cadTipoDeMetodo.map(c => ({ label: c.cdTipoDeMetodo + " - " + c.nmTipoDeMetodo, value: c.cdTipoDeMetodo }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      })
  }

  carregarFrequencia() {
    this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.cadFrequencia.listarTodas(this.empresaSelecionada.cdEmpresa)
          .then(cadfrequencia => {
            this.cadfrequencia = cadfrequencia.map(c => ({ label: c.cdFrequencia + " - " + c.nmFrequencia, value: c.cdFrequencia }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      })
  }

  carregarAmostragem() {
    this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.cadAmostragem.listarTodas(this.empresaSelecionada.cdEmpresa)
          .then(cadamostragem => {
            this.cadamostragem = cadamostragem.map(c => ({ label: c.cdAmostragem + " - " + c.nmAmostragem, value: c.cdAmostragem }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      })
  }

  carregarVerificadoresPorTipo(cdTipoDeVerificador: any) {
    return this.verificadorMService.listarPorTipo(cdTipoDeVerificador)
      .then(verificadorM => {
        this.verificadorM = verificadorM.map(c => ({ label:c.codigo + " - " + c.codalfa + " - " + c.sigla + " - " + c.nmVerificador, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarModelosPorTipo() {
    const filtroModelosPorTipo: FiltroModelosPorTipo2 = {
      cdTipoDeVerificador: this.associarVerificadorSalvar.cdTipoDeVerificador.cdTipoDeVerificador,
    }  
    this.carregarVerificadoresPorTipo(this.associarVerificadorSalvar.cdTipoDeVerificador.cdTipoDeVerificador);
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

  pesquisarLocal2() {

    const filtro3: Filtro3 = {
      cdLocal1: this.cdLocal1,
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

  pesquisar(){

    const filtro2: filtroPesquisa = {
      cdEmpresa: this.empresaSelecionada.cdEmpresa,
      codigo: this.associarVerificadorSalvar.idVerificador.codigo,
      }
    this.associarverificadorService.pesquisar(filtro2)
      .then(verificadorlocalm => this.verificadorlocalm = verificadorlocalm)
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMateriais() {
    return this.associarverificadorService.listarMateriais()
      .then(cadmaterial => {
        this.cadmaterial = cadmaterial.map(c => ({ label: c.id_material + " - " + c.nm_material, value: c.id_material }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }








}
