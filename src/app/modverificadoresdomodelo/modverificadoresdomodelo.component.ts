import { Component, OnInit,ViewChild } from '@angular/core';
import { Modverificadoresdomodelo } from '../core/model';
import { SelectItem } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../core/error-handler.service';
import { CadtipodeverificadorService } from '../cadtipodeverificador/cadtipodeverificador.service';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { FormControl } from '@angular/forms';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { ModmonitoramentotemplateService } from '../modmonitoramentotemplate/modmonitoramentotemplate.service';
import { ModverificadoresdomodeloFiltro, ModverificadoresdomodeloService, Filtro2, FiltroModelosPorTipo } from './modverificadoresdomodelo.service';
import { VerificadorMService } from '../verificador-m/verificador-m.service';

@Component({
  selector: 'app-modverificadoresdomodelo',
  templateUrl: './modverificadoresdomodelo.component.html',
  styleUrls: ['./modverificadoresdomodelo.component.css']
})
export class ModverificadoresdomodeloComponent  {

  tatalRegistros = 0;
  filtro = new ModverificadoresdomodeloFiltro();
  filtro2 = new Filtro2();
  filtroModelosPorTipo = new FiltroModelosPorTipo();
  txColetaAnalitica: string;
  cdTipoDeVerificador:number;

  verificadoresDoModeloSalvar = new Modverificadoresdomodelo();
  verificadordomodelo = [];
  verificadorM = [];
  empresas = [];
  MonitoramentoTemplate = [];
  cadTipoDeVerificador = [];
  @ViewChild('tabela') grid;

  constructor(
    private modmonitoramentotemplateService: ModmonitoramentotemplateService,
    private modverificadoresdomodeloService: ModverificadoresdomodeloService,
    private cadTipoDeVerificadorService: CadtipodeverificadorService,
    private verificadorM2: VerificadorMService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.carregarMonitoramentoTemplate();
      this.carregarTipoVerificadores();
      const codigoAppMonitoramento = this.route.snapshot.params['codigo'];
    }

    pesquisar() {

      const filtro: ModverificadoresdomodeloFiltro = {
        cdTemplate: this.verificadoresDoModeloSalvar.cdTemplate.cdTemplate,
        cdEmpresa: this.verificadoresDoModeloSalvar.cdEmpresa.cdEmpresa
      }
      this.modverificadoresdomodeloService.pesquisar(filtro)
        .then(verificadordomodelo => this.verificadordomodelo = verificadordomodelo);
    
    
      }

      pesquisarModelosPorTipo() {

        const filtroModelosPorTipo: FiltroModelosPorTipo = {
          cdTipoDeVerificador: this.cdTipoDeVerificador,
          
        }
        this.carregarModelosPorTipo(this.cdTipoDeVerificador);  
        this.carregarVerificadoresPorTipo(this.cdTipoDeVerificador);
      }

      carregarVerificadoresPorTipo(cdTipoDeVerificador: any) {
        return this.verificadorM2.listarPorTipo(cdTipoDeVerificador)
        .then(verificadorM => {
          this.verificadorM = verificadorM.map(c => ({ label: c.codalfa + " - " + c.sigla + " - " + c.nmVerificador, value: c.cdVerificador }));
        })
        .catch(erro => this.errorHandler.handle(erro));
      }

      carregarModelosPorTipo(cdTipoDeVerificador:any) {
        return this.modmonitoramentotemplateService.listarPorTipo(cdTipoDeVerificador)
          .then(MonitoramentoTemplate => {
            this.MonitoramentoTemplate = MonitoramentoTemplate.map(c => ({ label: c.cdTemplate + " - " + c.nmTemplate, value: c.cdTemplate }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }

     

      carregarTipoVerificadores() {
        return this.cadTipoDeVerificadorService.listarTodas()
          .then(cadTipoDeVerificador => {
            this.cadTipoDeVerificador = cadTipoDeVerificador.map(c => ({ label: c.cdTipoDeVerificador + " - " + c.nmTipoDeVerificador, value: c.cdTipoDeVerificador }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }
     
      
    aoMudarPagina(event: LazyLoadEvent) {
      const page = event.first / event.rows;
  
    }

    confirmarExclusao(verificadordomodelo: any) {
      this.confirmation.confirm( {
        message: 'Tem certeza que deseja excluir o verificador deste modelo?',
        accept: () =>{
          this.excluir(verificadordomodelo);
        }
      });
    }
  
    excluir(verificadordomodelo: any){
  
      this.modverificadoresdomodeloService.excluir(verificadordomodelo.cdVeriMod)
        .then(() => {
         this.pesquisar();
          this.toasty.success('Verificador excluído com sucesso!');
        })
        
  
    }
   
    carregarMonitoramentoTemplate() {
      return this.modmonitoramentotemplateService.listarTodas()
        .then(modmonitoramento => {
          this.MonitoramentoTemplate = modmonitoramento.map(c => ({ label: c.cdTemplate + " - " + c.nmTemplate + " - " + c.cdTipoDeVerificador, value: c.cdTemplate }));
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    


  }
