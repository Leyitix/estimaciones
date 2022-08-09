import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CrudService } from '../../../../shared/services/crud.service';
import { FuncionalidadModel } from '../../models/clases/funcionalidades.model';
import { ModuloModel } from '../../models/clases/modulo.model';

@Component({
  selector: 'app-maestro-funcionalidades',
  templateUrl: './maestro-funcionalidades.component.html',
  styleUrls: ['./maestro-funcionalidades.component.scss']
})
export class MaestroFuncionalidadesComponent implements OnInit {

@ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  funcionalidades: FuncionalidadModel[] = [];
  funcionalidad: FuncionalidadModel = new FuncionalidadModel();
  modulos: ModuloModel[] = [];
  
  columnas: any[] = [];

  constructor( private crudService: CrudService ) { }

  ngOnInit(): void {

    this.getFuncionalidades();
    this.getModulos();

  }

  getColumnas() {

    this.columnas = [
      { 
        dataField: 'id', 
        caption: 'ID',
        dataType: 'number'
      },
      { 
        dataField: 'idModulo', 
        caption: 'Módulo', 
        selector: true, 
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
        lookup: {

          dataSource: this.modulos,

          valueExpr: 'id',

          displayExpr: (e: any) => {

            return !!e && `${e.nombre}`;

          }
        }
      },
      { 
        dataField: 'nombre', 
        caption: 'Nombre', 
        dataType: 'string',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ]
      },
      { 
        dataField: 'descripcion', 
        caption: 'Descripción', 
        dataType: 'string' 
      },
      // {
      //   dataField: 'start',
      //   caption: 'Fecha Inicio',
      //   format: 'dd/MM/yyyy',
      //   dataType: 'date',
      //   editorOptions: {
      //     openOnFieldClick: true
      //   },
      //   validationRules: [
      //     {
      //       type: 'required',
      //       message: 'Campo obligatorio'
      //     }
      //   ]
      // }, 
      // {
      //   dataField: 'end',
      //   caption: 'Fecha fin',
      //   format: 'dd/MM/yyyy',
      //   dataType: 'date',
      //   editorOptions: {
      //     openOnFieldClick: true
      //   },
      //   validationRules: [
      //     {
      //       type: 'required',
      //       message: 'Campo obligatorio'
      //     }
      //   ]
      // }
    ]
  }

  // Mostrar funcionalidades
  getFuncionalidades() {

    this.crudService.getAll( 'funcionalidad' ).subscribe( ( funcionalidades: FuncionalidadModel[] ) => {
      
      this.funcionalidades = funcionalidades
   
    })

  }

  // Mostrar módulos
  getModulos() {

    this.crudService.getAll( 'modulo' ).subscribe( ( modulos: ModuloModel[] ) => {
      
      this.modulos = modulos
      this.getColumnas();

    })

  }



  // añadir funcionalidad
  logInsertEvent(e: FuncionalidadModel) {

    this.funcionalidad.nombre = e.nombre;

    this.funcionalidad.descripcion = e.descripcion;

    this.funcionalidad.idModulo = e.idModulo;

    this.funcionalidad.progress = 100;

    this.funcionalidad.start = e.start;

    this.funcionalidad.end = e.end;
    
    this.crudService.addNew( 'funcionalidad', 'añadida', this.funcionalidad ).subscribe( ( resp: FuncionalidadModel ) => {
      
      this.getFuncionalidades();

    })

  }

   // eliminar funcionalidad
   logRemovingEvent( e: FuncionalidadModel ) {

    this.crudService.deleteById( 'funcionalidad', 'eliminada', e.id ).subscribe( ( result ) => {
      
      this.getFuncionalidades();

    })

  }

  // editar una funcionalidad
  logUpdatingEvent( e: any ) {

    let newData: FuncionalidadModel = e.newData;

    let oldData: FuncionalidadModel = e.oldData;

    let updatedFuncionalidad: FuncionalidadModel = new FuncionalidadModel();

    let updatedFuncionalidadId: number = updatedFuncionalidad.id = e.key;

    newData.nombre ? updatedFuncionalidad.nombre = newData.nombre : updatedFuncionalidad.nombre = oldData.nombre;

    newData.descripcion ? updatedFuncionalidad.descripcion = newData.descripcion : updatedFuncionalidad.descripcion = oldData.descripcion;

    newData.idModulo ? updatedFuncionalidad.idModulo = newData.idModulo : updatedFuncionalidad.idModulo = oldData.idModulo;
    
    newData.progress ? updatedFuncionalidad.progress = newData.progress : updatedFuncionalidad.progress = oldData.progress;

    newData.start ? updatedFuncionalidad.start = newData.start : updatedFuncionalidad.start = oldData.start;

    newData.end ? updatedFuncionalidad.end = newData.end : updatedFuncionalidad.end = oldData.end;
    
    if ( updatedFuncionalidadId ) {
      
      this.crudService.updateById( 'funcionalidad', 'editada', updatedFuncionalidad ).subscribe( ( funcionalidad: FuncionalidadModel ) => {
        
        this.grid?.instance.refresh();
  
      })
    
    }

  } 


}
