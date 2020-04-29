import { Verificador_m, Verificador_Local_m, Cadtipodemetodo } from './../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadtipodeverificadorService } from './../cadtipodeverificador/cadtipodeverificador.service';

import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';

import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { CadverificadorLocalFiltro, AssociarverificadorService, FiltroModelosPorTipo2 } from './associarverificador.service';
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
  verificadorM = [];
  cadtipodeverificador = [];
  cadtipodemetodo = [];
  cadamostragem = [];
  cadfrequencia = [];
  modlocal1 = [];

  cadmaterial = [];
  cadmaterial2 = [];
  cadmaterial3 = [];
  cadTipoDeVerificador = [];

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
    private cadTipoDeVerificadorService: CadtipodeverificadorService,
    private amostragem: CadamostragemService,
    private frequencia: CadfrequenciaService,
    private tipoDeMetodo: CadtipodemetodoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {
    this.carregarTipoVerificadores();
   
   // this.pesquisar();
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


   

    



}
