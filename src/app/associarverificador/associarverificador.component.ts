import { Verificador_m, Verificador_Local_m, Cadtipodemetodo } from './../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadtipodeverificadorService } from './../cadtipodeverificador/cadtipodeverificador.service';

import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';

import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { CadverificadorLocalFiltro, AssociarverificadorService } from './associarverificador.service';
import { VerificadorMService } from '../verificador-m/verificador-m.service';
import { CadtipodemetodoService } from '../cadtipodemetodo/cadtipodemetodo.service';
import { CadamostragemService } from '../cadamostragem/cadamostragem.service';
import { CadfrequenciaService } from '../cadfrequencia/cadfrequencia.service';
import { Modlocal1Service } from '../modlocal1/modlocal1.service';
import { Modlocal2Service } from '../modlocal2/modlocal2.service';
import { UnidadelocalsublocalService } from '../unidadelocalsublocal/unidadelocalsublocal.service';
import { CadmaterialService } from '../cadmaterial/cadmaterial.service';

@Component({
  selector: 'app-associarverificador',
  templateUrl: './associarverificador.component.html',
  styleUrls: ['./associarverificador.component.css']
})
export class AssociarverificadorComponent implements OnInit {

  verificadorlocalm = [];
  verificadorm = [];
  cadtipodeverificador = [];
  cadtipodemetodo = [];
  cadamostragem = [];
  cadfrequencia = [];
  modlocal1 = [];
  modlocalFOD = [];
  modlocalFOA = [];
  modlocalPEO = [];
  modlocalPATRANS = [];
  modlocalINFRA = [];
  modlocalMON = [];
  modlocalACAM = [];
  modlocalESCRI = [];
  modlocalENTOR = [];
  modlocal3_cdLocal1_1_cdLocal2_1 = [];
  modlocal3_cdLocal1_1_cdLocal2_2 = [];
  modlocal3_cdLocal1_1_cdLocal2_3 = [];

  modlocal3_cdLocal1_2_cdLocal2_4 = [];
  modlocal3_cdLocal1_2_cdLocal2_5 = [];

  modlocal3_cdLocal1_3_cdLocal2_6 = [];
  modlocal3_cdLocal1_3_cdLocal2_7 = [];
  modlocal3_cdLocal1_3_cdLocal2_8 = [];
  modlocal3_cdLocal1_3_cdLocal2_9 = [];

  modlocal3_cdLocal1_4_cdLocal2_10 = [];
  modlocal3_cdLocal1_4_cdLocal2_11 = [];
  
  modlocal3_cdLocal1_5_cdLocal2_12 = [];
  modlocal3_cdLocal1_5_cdLocal2_13 = [];
  modlocal3_cdLocal1_5_cdLocal2_14 = [];
  modlocal3_cdLocal1_5_cdLocal2_15 = [];

  modlocal3_cdLocal1_6_cdLocal2_16 = [];
  modlocal3_cdLocal1_6_cdLocal2_17 = [];
  modlocal3_cdLocal1_6_cdLocal2_18 = [];

  modlocal3_cdLocal1_7_cdLocal2_19 = [];
  modlocal3_cdLocal1_7_cdLocal2_20 = [];
  modlocal3_cdLocal1_7_cdLocal2_21 = [];

  modlocal3_cdLocal1_8_cdLocal2_22 = [];
  modlocal3_cdLocal1_8_cdLocal2_23 = [];
  modlocal3_cdLocal1_8_cdLocal2_24 = [];

  modlocal3_cdLocal1_9_cdLocal2_25 = [];
  modlocal3_cdLocal1_9_cdLocal2_26 = [];

  cadmaterial = [];
  cadmaterial2 = [];
  cadmaterial3 = [];

  associarVerificadorSalvar = new Verificador_Local_m;


  filtro = new CadverificadorLocalFiltro;

  @ViewChild('tabela') grid;
  constructor(

    private associarverificadorService: AssociarverificadorService,
    private unidadelocalsublocalService: UnidadelocalsublocalService,
    private cadMaterialService: CadmaterialService,
    private verificadorMService: VerificadorMService,
    private toasty: ToastyService,
    private modLocal1Service: Modlocal1Service,
    private modLocal2Service: Modlocal2Service,
    private tipoDeVerificadores: CadtipodeverificadorService,
    private amostragem: CadamostragemService,
    private frequencia: CadfrequenciaService,
    private tipoDeMetodo: CadtipodemetodoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {

    this.carregarTipoDeVerificadores();
    this.carregarTipoDeMetodo();
    this.carregarAmostragem();
    this.carregarFrequencia();
    this.carregarUnidadeDeAvaliacao();
  
    this.carregarMaterial1();
    this.carregarMaterial2();
    this.carregarMaterial3();

    

    // this.pesquisar();
    const codigoVerificadorLocalM = this.route.snapshot.params['codigo'];

    //  se houver um id entra no metodo de carregar valores
    if (codigoVerificadorLocalM) {
      this.carregarVerificadorLocalM(codigoVerificadorLocalM);
    }

  }


   //Metodo para carregar valores
   carregarVerificadorLocalM(codigo: number) {
    this.associarverificadorService.buscarPorCodigo(codigo)
      .then(verificadorlocal => {
        this.associarVerificadorSalvar = verificadorlocal;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    carregarTipoDeMetodo() {
      return this.tipoDeMetodo.listarTodas()
        .then(tipoDeMetodo => {
          this.cadtipodemetodo = tipoDeMetodo.map(c => ({ label: c.nmTipoDeMetodo, value: c.cdTipoDeMetodo }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarTipoDeVerificadores() {
      return this.tipoDeVerificadores.listarTodas()
        .then(tipoDeVerificadores => {
          this.cadtipodeverificador = tipoDeVerificadores.map(c => ({ label: c.nmTipoDeVerificador, value: c.cdTipoDeVerificador }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarAmostragem() {
      return this.amostragem.listarTodas()
        .then(amostragem => {
          this.cadamostragem = amostragem.map(c => ({ label: c.nmAmostragem, value: c.cdAmostragem }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
    carregarFrequencia() {
      return this.frequencia.listarTodas()
        .then(frequencia => {
          this.cadfrequencia = frequencia.map(c => ({ label: c.nmFrequencia, value: c.cdFrequencia }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarUnidadeDeAvaliacao() {
      return this.modLocal1Service.listarTodas()
        .then(modlocal1 => {
          this.modlocal1 = modlocal1.map(c => ({ label: c.cdLocal1 + " - " + c.nmlocal1, value: c.cdLocal1 }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarMaterial1() {
      return this.cadMaterialService.listarTodas()
        .then(material => {
          this.cadmaterial = material.map(c => ({ label: c.nmMaterial, value: c.cdMaterial }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarMaterial2() {
      return this.cadMaterialService.listarTodas()
        .then(material => {
          this.cadmaterial2 = material.map(c => ({ label: c.nmMaterial, value: c.cdMaterial }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    carregarMaterial3() {
      return this.cadMaterialService.listarTodas()
        .then(material => {
          this.cadmaterial3 = material.map(c => ({ label: c.nmMaterial, value: c.cdMaterial }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }



   

    



}
