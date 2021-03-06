import { CadempresaService } from './../cadempresa/cadempresa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadfrequenciaFiltro, CadfrequenciaService } from './cadfrequencia.service';
import { LazyLoadEvent } from 'src/primeng/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Cadfrequencia, MenuEmpresa } from '../core/model';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { MenuModule } from 'src/primeng/menu';
import { MenuService } from '../menu/menu.service';


@Component({
  selector: 'app-cadfrequencia',
  templateUrl: './cadfrequencia.component.html',
  styleUrls: ['./cadfrequencia.component.css']
})
export class CadfrequenciaComponent {

  tatalRegistros = 0;
  filtro = new CadfrequenciaFiltro();
  nmFrequencia: string;
  frequenciaSalvar = new Cadfrequencia();
  cdEmp: any;
  @ViewChild('tabela') grid;

  cadfrequencia=[]

  
  empresaSelecionada = new MenuEmpresa();
  

  constructor(
    private cadfrequenciaService: CadfrequenciaService,
    private menuService: MenuService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    
    
  ){}

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);
    this.carregarEmpresaSelecionada();
    const codigoFrequencia = this.route.snapshot.params['codigo'];
    //se houver um id entra no metodo de carregar valores
    if(codigoFrequencia){
      this.carregarFrequencia(codigoFrequencia);
    }
  }

  get editando(){
    return Boolean(this.frequenciaSalvar.cdFrequencia)
  }

  //Metodo para carregar valores
  carregarFrequencia(codigo: number){
    this.cadfrequenciaService.buscarPorCodigo(codigo)
      .then(frequencia => {
        this.frequenciaSalvar = frequencia;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
        this.frequenciaSalvar.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.cdEmp = this.frequenciaSalvar.cdEmpresa.cdEmpresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar2(cdEmpresa) {
    this.cadfrequenciaService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.cadfrequencia  = empresaSelecionada);
  }

  pesquisar(){

    const filtro: CadfrequenciaFiltro = {
      cdEmpresa: this.cdEmp,
      }
    this.cadfrequenciaService.pesquisar(filtro)
      .then(frequencia => this.cadfrequencia = frequencia)
      .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;

  }

  confirmarExclusao(frequencia: any) {
    if(frequencia.cdEmpresa.cdEmpresa != 1){
      this.confirmation.confirm( {
        message: 'Tem certeza que deseja excluir?',
        accept: () =>{
          this.excluir(frequencia);
        }
      });
    }else {
      this.toasty.warning('Você não pode excluir dados da Empresa Exemplo!');
    }
    
  }

  excluir(frequencia: any){

    this.cadfrequenciaService.excluir(frequencia.cdFrequencia)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }
        this.toasty.success('Frequencia excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  salvar(form: FormControl){
    if(this.frequenciaSalvar.cdEmpresa.cdEmpresa != 1){
      if(this.editando){
        this.confirmarAlterar(form);
      } else {
        this.confirmarSalvar(form);
      }
    }else {
      this.toasty.warning('Você não pode salvar dados na Empresa Exemplo!');
    }
  }


      confirmarSalvar(frequencia: any) {
        this.confirmation.confirm( {
          message: 'Tem certeza que deseja salvar?',
          accept: () =>{
            this.adicionarFrequencia(frequencia);
          }
        });
      }

      confirmarAlterar(frequencia: any) {
        this.confirmation.confirm( {
          message: 'Tem certeza que deseja alterar?',
          accept: () =>{
            this.atualizarFrequencia(frequencia);
          }
        });
      }

      adicionarFrequencia(form: FormControl){
        this.frequenciaSalvar.cdEmpresa.cdEmpresa = this.cdEmp;
        this.cadfrequenciaService.adicionar(this.frequenciaSalvar)
          .then(() => {
            this.toasty.success("Frequencia cadastrada com sucesso!");
            form.reset();
            this.frequenciaSalvar = new Cadfrequencia();
            this.pesquisar();
          })
          .catch(erro => this.errorHandler.handle(erro));
      }

      atualizarFrequencia(form: FormControl){
        this.cadfrequenciaService.atualizar(this.frequenciaSalvar)
        .then(frequencia => {
          this.frequenciaSalvar = frequencia;

          this.toasty.success('Frequencia alterada com sucesso!');

        })
      .catch(erro => this.errorHandler.handle(erro));
      }

}
