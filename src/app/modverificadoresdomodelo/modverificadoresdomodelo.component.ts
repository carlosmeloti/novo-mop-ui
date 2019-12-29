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
import { ModverificadoresdomodeloFiltro, ModverificadoresdomodeloService } from './modverificadoresdomodelo.service';

@Component({
  selector: 'app-modverificadoresdomodelo',
  templateUrl: './modverificadoresdomodelo.component.html',
  styleUrls: ['./modverificadoresdomodelo.component.css']
})
export class ModverificadoresdomodeloComponent  {

  tatalRegistros = 0;
  filtro = new ModverificadoresdomodeloFiltro();
  txColetaAnalitica: string;

  verificadoresDoModeloSalvar = new Modverificadoresdomodelo();
  verificadordomodelo = [];

  empresas = [];
  @ViewChild('tabela') grid;

  constructor(
    private modverificadoresdomodeloService: ModverificadoresdomodeloService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
    ) {}


  pesquisar(page = 0){

    this.filtro.page = page;

    this.modverificadoresdomodeloService.pesquisar(this.filtro)
      .then(resultado => {
        this.tatalRegistros = resultado.total;
        this.verificadordomodelo = resultado.verificadordomodelo;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    aoMudarPagina(event: LazyLoadEvent){
      const page = event.first / event.rows;
      this.pesquisar(page);
    }


  }
