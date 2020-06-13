import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/primeng/components/common/menuitem';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CadempresaService } from '../cadempresa/cadempresa.service';
import { MenuEmpresa, empresaSelecionada, EmpresaSelecionadaExibicao } from '../core/model';
import { MenuempresaService } from '../menuempresa/menuempresa.service';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from '../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { MenuService } from './menu.service';
import { CadfrequenciaService } from '../cadfrequencia/cadfrequencia.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cdEmpresa: number;

  empresas = [];
  empresaSelecionadaExibicao= new EmpresaSelecionadaExibicao();

  constructor(
    private cadEmpresaService: CadempresaService,
    private menuService: MenuService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute
  ) { }
  items: MenuItem[];
  menuSalvar = new MenuEmpresa();
  empresaSelecionada = new empresaSelecionada();

  ngOnInit() {
    this.carregarEmpresas();
    this.carregarEmpresaSelecionada();
    
    this.items = [
      {
          label: 'Cadastro Geral',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                label: 'Empresa',
                routerLink: '/cadempresa'
              },
              {separator: true},
              {
                label: 'Tipo Verificador',
                routerLink: '/cadtipodeverificador'
              },
              {
                label: 'Categoria de Avaliação',
                routerLink: '/cadniveldeavaliacao'
              },
              {
                label: 'Amostragem',
                routerLink: '/cadamostragem'
              },
              {
                label: 'Frequência',
                routerLink: '/cadfrequencia'
              },
              {
                label: 'Tipo de Método',
                routerLink: '/cadtipodemetodo'
              },
              {
                label: 'Material',
                routerLink: '/cadmaterial'
              },
              {separator: true},
              {label: 'Sair'}
          ]
      },
      {
          label: 'Ambiente Modelo',
          icon: 'pi pi-fw pi-clone',
          items: [
              {
                label: 'Verificador',
                routerLink: '/verificador_m'
              },
              {
                label: 'Associar Verificador',
                routerLink: '/associarverificador'
              },
              {
                label: 'Unidade de Avaliação',
                routerLink: '/modlocal1'
              },
              {
                label: 'Local de Avaliação',
                routerLink: '/modlocal2'
              },
              {
                label: 'Sublocal',
                routerLink: '/unidadelocalsublocal'
              },
              {
                label: 'Nível Hierárquivo ( Assunto, etapa, Item e subitem)',
                routerLink: '/modnivel4'
              },
              {separator: true},
              {
                label: 'Template Monitoramento',
                items: [{
                  label: 'Modelo de Monitoramento',
                  routerLink: '/modmonitoramentotemplate'
                },
                {
                  label: 'Verificadores do Modelo',
                  routerLink: '/modverificadoresdomodelo'
                }]

              }
          ]
      },
      {
          label: 'Ambiente Aplicação',
          icon: 'pi pi-fw pi-mobile',
          items: [
            {
              label: 'Geração de Monitoramento a partir de Modelo',
              routerLink: '/appmonitoramento'
            },
            {separator: true},
            {
              label: 'Monitoramento',
              routerLink: '/appmonitoramentoverificador'
            },
            {
              label: 'Avaliação',
              routerLink: '/appavaliacao'
            }, 
            {separator: true},
            {
              label: 'Formulário de Coleta de Dados',
              routerLink: '/appformulariocoleta'            
            },
            {
              label: 'Coleta de Dados',
              routerLink: '/appcoletadedados'
            }
        ]
      },
     /* {
          label: 'Relatório',
          icon: 'pi pi-chart-bar',
          items: [
            {label: 'Relatório sitético de avaliação'},
            {label: 'Relatório analítico de avaliação'},
            {label: 'Relatório sintético de evolução sobre avaliação dos verificadores'},
            {label: 'Relatório analítico de evolução sobre avaliação dos verificadores'}
        ]
      },
      {
        label: 'Ajuda',
        icon: 'pi pi-fw pi-question',
        items: [
            {label: 'Como utilizar o MOP'},
            {label: 'Sobre...'}
        ]
      },*/
      {
          label: 'Início', icon: 'pi pi-fw pi-times',
          routerLink:'/inicio'
      }
  ];
  }

  carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      //.catch(erro => this.errorHandler.handle(erro));
  }

  adicionar(form: FormControl){
    this.menuService.adicionar(this.menuSalvar)
      .then(() => {
        this.toasty.success("Empresa selecionada com sucesso!");
        form.reset();
        this.menuSalvar = new MenuEmpresa();
        this.refresh();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

 
  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionadaNome()
      .then(empresaSelecionada => {
        this.empresaSelecionadaExibicao.nmempresa = empresaSelecionada;
        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  

  refresh(): void {
    window.location.reload();
  }

 

}
