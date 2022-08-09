import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../../../shared/services/crud.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModuloModel } from '../../models/clases/modulo.model';
import { ProyectoModel } from '../../models/clases/proyecto.model';

@Component({
  selector: 'app-maestro-modulos',
  templateUrl: './maestro-modulos.component.html',
  styleUrls: ['./maestro-modulos.component.scss']
})
export class MaestroModulosComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  modulos: ModuloModel[] = [];

  modulo: ModuloModel = new ModuloModel();

  proyectos: ProyectoModel[] = [];

  columnas: any[] = [];

  constructor( private crudService: CrudService ) { }

  ngOnInit(): void {

    this.getModulos();
    this.getProyectos();

  }

  getColumnas() {

    this.columnas = [
      {
        dataField: 'id',
        caption: 'ID',
        dataType: 'number'
      },

      {
        dataField: 'idProyecto',
        caption: 'Proyecto',
        selector: true,
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }

        ],
        lookup: {

          dataSource: this.proyectos,

          valueExpr: 'id',

          displayExpr: (e: any) => {

            return !!e && `${e.nombre}`;

          },

        },
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
        ],
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
      //     openOnFieldClick: true,
      //   },

      //   validationRules: [
      //     {
      //       type: 'required',
      //       message: 'Campo obligatorio'
      //     }
      //   ]
      // },
    ]
  }
  

  // Mostrar todos los módulos
  getModulos() {

    this.crudService.getAll('modulo').subscribe((modulos: ModuloModel[]) => {

      this.modulos = modulos

    })

  }

  // Mostrar todos los proyectos
  getProyectos() {

    this.crudService.getAll('proyecto').subscribe((proyectos: ProyectoModel[]) => {
      
      this.proyectos = proyectos
      this.getColumnas();

    })

  };


  // añadir módulos
  logInsertEvent(e: any) {
    
    this.modulo.nombre = e.nombre;

    this.modulo.descripcion = e.descripcion;

    this.modulo.idProyecto = e.idProyecto;

    this.modulo.progress = 100;

    this.modulo.start = e.start;

    this.modulo.end = e.end;

    this.crudService.addNew('modulo', 'añadido', this.modulo).subscribe((resp: ModuloModel) => {

      this.getModulos();

    })

  }

  // eliminar modulos
  logRemovingEvent(e: ModuloModel) {

    this.crudService.deleteById('modulo', 'eliminado', e.id).subscribe((result) => {

      this.getModulos();

    })

  }

  // editar un registro
  logUpdatingEvent(e: any) {

    let newData: ModuloModel = e.newData;

    let oldData: ModuloModel = e.oldData;

    let updatedModulo: ModuloModel = new ModuloModel();

    let updatedModuloId: number = updatedModulo.id = e.key;

    newData.nombre ? updatedModulo.nombre = newData.nombre : updatedModulo.nombre = oldData.nombre;

    newData.idProyecto ? updatedModulo.idProyecto = newData.idProyecto : updatedModulo.idProyecto = oldData.idProyecto;

    newData.descripcion ? updatedModulo.descripcion = newData.descripcion : updatedModulo.descripcion = oldData.descripcion;

    newData.progress ? updatedModulo.progress = newData.progress : updatedModulo.progress = oldData.progress;

    newData.start ? updatedModulo.start = newData.start : updatedModulo.start = oldData.start;

    newData.end ? updatedModulo.end = newData.end : updatedModulo.end = oldData.end;

    if ( updatedModuloId ) {
      
      this.crudService.updateById('modulo', 'editado', updatedModulo).subscribe( ( modulo: ModuloModel ) => {

        this.grid?.instance.refresh();
  
      })
    
    }

    


  }

}
