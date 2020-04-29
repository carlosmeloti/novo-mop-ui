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
import { ModmonitoramentotemplateService } from '../modmonitoramentotemplate/modmonitoramentotemplate.service';
import { ModverificadoresdomodeloFiltro, ModverificadoresdomodeloService, Filtro2, FiltroModelosPorTipo, FiltroNivel2, FiltroNivel3, FiltroNivel4 } from './modverificadoresdomodelo.service';
import { VerificadorMService } from '../verificador-m/verificador-m.service';
import { Modnivel1Service } from '../modnivel1/modnivel1.service';
import { Modnivel2Service } from '../modnivel2/modnivel2.service';
import { Modnivel3Service } from '../modnivel3/modnivel3.service';
import { Modnivel4Service } from '../modnivel4/modnivel4.service';
import { CadempresaService } from '../cadempresa/cadempresa.service';
@Component({
  selector: 'app-modverificadoresdomodelo',
  templateUrl: './modverificadoresdomodelo.component.html',
  styleUrls: ['./modverificadoresdomodelo.component.css']
})
export class ModverificadoresdomodeloComponent  {

  tatalRegistros = 0;
  filtro = new ModverificadoresdomodeloFiltro();
  filtro2 = new Filtro2();
  filtroNivel2 = new FiltroNivel2();
  filtroNivel3 = new FiltroNivel3();
  filtroNivel4 = new FiltroNivel4();
  filtroModelosPorTipo = new FiltroModelosPorTipo();
  txColetaAnalitica: string;
  cdTipoDeVerificador:number;
  cdNivel1: number;
  cdNivel2: number;
  cdNivel3: number;
  cdNivel4: number;
  verificadoresDoModeloSalvar = new Modverificadoresdomodelo();
  verificadordomodelo = [];
  verificadordomodeloTabela = [];
  verificadorM = [];
  empresas = [];
  MonitoramentoTemplate = [];
  cadTipoDeVerificador = [];
  modNivel1 = [];
  modNivel2 = [];
  modNivel3 = [];
  modNivel4 = [];
  groupname: string[] = ['val1','val2']; 
  @ViewChild('tabela') grid;

  constructor(
    private modmonitoramentotemplateService: ModmonitoramentotemplateService,
    private modverificadoresdomodeloService: ModverificadoresdomodeloService,
    private cadTipoDeVerificadorService: CadtipodeverificadorService,
    private cadEmpresaService: CadempresaService,
    private modNivel1Service: Modnivel1Service,
    private modNivel2Service: Modnivel2Service,
    private modNivel3Service: Modnivel3Service,
    private modNivel4Service: Modnivel4Service,
    private verificadorM2: VerificadorMService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.carregarTipoVerificadores();
      this.carregarEmpresas();
      const codigoAppMonitoramento = this.route.snapshot.params['codigo'];
    }

    carregarEmpresas() {
      return this.cadEmpresaService.listarTodas()
        .then(empresas => {
          this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
        })
        .catch(erro => this.errorHandler.handle(erro));
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
          cdTipoDeVerificador: this.verificadoresDoModeloSalvar.cdTipoDeVerificador.cdTipoDeVerificador,
          
        }
        this.carregarModelosPorTipo(this.verificadoresDoModeloSalvar.cdTipoDeVerificador.cdTipoDeVerificador);  
        this.carregarVerificadoresPorTipo(this.verificadoresDoModeloSalvar.cdTipoDeVerificador.cdTipoDeVerificador);
        this.carregarModNivel1();
      }

      pesquisarNivel2() {

        const filtroNivel2: FiltroNivel2 = {
          cdNivel1: this.verificadoresDoModeloSalvar.cdNivel1.cdNivel1,
         
        }
             this.carregarNivel2(this.verificadoresDoModeloSalvar.cdNivel1.cdNivel1);
      }

      carregarNivel2(cdNivel1:any) {
        return this.modNivel2Service.listarPorNivel1(cdNivel1)
          .then(modNivel2 => {
            this.modNivel2 = modNivel2.map(c => ({ label: c.cdNivel2 + " - " + c.nmNivel2, value: c.cdNivel2 }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }
    
      pesquisarNivel3() {
    
        const filtroNivel3: FiltroNivel3 = {
          cdNivel2: this.verificadoresDoModeloSalvar.cdNivel2.cdNivel2,
         
        }
             this.carregarNivel3(this.verificadoresDoModeloSalvar.cdNivel2.cdNivel2);
      }

      carregarNivel3(cdNivel2:any) {
        return this.modNivel3Service.listarPorNivel2(cdNivel2)
          .then(modNivel3 => {
            this.modNivel3 = modNivel3.map(c => ({ label: c.cdNivel3 + " - " + c.nmNivel3, value: c.cdNivel3 }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }

      pesquisarNivel4() {
    
        const filtroNivel4: FiltroNivel4 = {
          cdNivel3: this.verificadoresDoModeloSalvar.cdNivel3.cdNivel3,
         
        }
             this.carregarNivel4(this.verificadoresDoModeloSalvar.cdNivel3.cdNivel3);
      }

      carregarNivel4(cdNivel3:any) {
        return this.modNivel4Service.listarPorNivel3(cdNivel3)
          .then(modNivel4 => {
            this.modNivel4 = modNivel4.map(c => ({ label: c.cdNivel4 + " - " + c.nmNivel4, value: c.cdNivel4 }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }

      pesquisarPorModelo() {
      
        const filtro: ModverificadoresdomodeloFiltro = {
          cdTemplate: this.verificadoresDoModeloSalvar.cdTemplate.cdTemplate,
          cdEmpresa: this.verificadoresDoModeloSalvar.cdEmpresa.cdEmpresa
        }
        this.modverificadoresdomodeloService.pesquisarPorModelo(filtro)
          .then(verificadordomodeloTabela => this.verificadordomodeloTabela = verificadordomodeloTabela);
      
      
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
     
      carregarModNivel1() {
        return this.modNivel1Service.listarTodas()
          .then(modNivel1 => {
            this.modNivel1 = modNivel1.map(c => ({ label: c.cdNivel1 + " - " + c.nmNivel1, value: c.cdNivel1 }));
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
         //this.pesquisar();
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

    salvar(modVerificadoresModelo: any) {
      this.confirmation.confirm( {
        message: 'Tem certeza que deseja salvar?',
        accept: () =>{
          this.adicionarmodVerificadoresModelo(modVerificadoresModelo);
        }
      });
    }
    adicionarmodVerificadoresModelo(form: FormControl){
      this.modverificadoresdomodeloService.adicionar(this.verificadoresDoModeloSalvar)
        .then(() => {
          this.toasty.success("Verificador adicionado com sucesso!");
          form.reset();
          this.verificadoresDoModeloSalvar = new Modverificadoresdomodelo();
          //this.pesquisar();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
    


  }
