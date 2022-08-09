import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../../../shared/services/crud.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ProyectoModel } from '../../models/clases/proyecto.model';
import { ConfiguracionProyectoModel } from '../../models/clases/configuracionProyecto.model';


@Component({
  selector: 'app-maestro-proyectos',
  templateUrl: './maestro-proyectos.component.html',
  styleUrls: ['./maestro-proyectos.component.scss']
})
export class MaestroProyectosComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  proyectos: ProyectoModel[] = [];

  proyecto: ProyectoModel = new ProyectoModel();

  configuraciones: ConfiguracionProyectoModel[] = [];

  columnas: any[] = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {

    this.getProyectos();
    this.getColumnas();
    this.getConfiguraciones();

    this.proyecto  = new ProyectoModel()

  }

  getColumnas() {

    this.columnas = [
      {
        dataField: 'id',
        caption: 'ID',
        hidingPriority: '0',
        dataType: 'number'
      },
      {
        dataField: 'codigo',
        caption: 'Código',
        dataType: 'string',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ]
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
      {
        dataField: 'start',
        caption: 'Fecha Inicio',
        format: 'dd/MM/yyyy',
        dataType: 'date',
        editorOptions: {
          openOnFieldClick: true
        },
          validationRules: [
            {
              type: 'required',
              message: 'Campo obligatorio'
            }
        ]
      },
      {
        dataField: 'configuracionId',
        caption: 'Configuracion',
        selector: true,
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }

        ],
        lookup: {

          dataSource: this.configuraciones,

          valueExpr: 'id',

          displayExpr: (e: any) => {

            return !!e && `${e.nombre}`;

          },

        },
      },
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

  // Obtener todos los datos
  getProyectos() {

    this.crudService.getAll('proyecto').subscribe((proyectos: ProyectoModel[]) => (this.proyectos = proyectos))

  }


  // Insertar un registro
  logInsertEvent(e: ProyectoModel) {

    this.proyecto.codigo = e.codigo;

    this.proyecto.nombre = e.nombre;

    this.proyecto.descripcion = e.descripcion;

    this.proyecto.progress = 100;

    this.proyecto.start = e.start;
    
    this.proyecto.end = e.end;

    this.proyecto.configuracionId = e.configuracionId;


    this.crudService.addNew('proyecto', 'añadido', this.proyecto).subscribe((resp: ProyectoModel) => {

      this.getProyectos();

    })

  }


  // Eliminar proyecto
  logRemovingEvent(e: ProyectoModel) {

    this.crudService.deleteById('proyecto', 'eliminado', e.id).subscribe((result) => {

      this.getProyectos();

    })

  }


  logUpdatingEvent(e: any) {

    let newData: ProyectoModel = e.newData;

    let oldData: ProyectoModel = e.oldData;

    let updatedProject: ProyectoModel = new ProyectoModel();

    let updatedProjectId: number = updatedProject.id = e.key;

    let nombre = newData.nombre ? updatedProject.nombre = newData.nombre : updatedProject.nombre = oldData.nombre;
    
    let codigo = newData.codigo ? updatedProject.codigo = newData.codigo : updatedProject.codigo = oldData.codigo;

    let descripcion = newData.descripcion ? updatedProject.descripcion = newData.descripcion : updatedProject.descripcion = oldData.descripcion;

    let progress = newData.progress ? updatedProject.progress = newData.progress : updatedProject.progress = oldData.progress;

    let start = newData.start ? updatedProject.start = newData.start : updatedProject.start = oldData.start;

    let end = newData.end ? updatedProject.end = newData.end : updatedProject.end = oldData.end;
    
    let configuracionId = newData.configuracionId ? updatedProject.configuracionId = newData.configuracionId : updatedProject.configuracionId = oldData.configuracionId; 
   
    if ( updatedProjectId ) {
      
      this.crudService.updateById('proyecto', 'editado', updatedProject ).subscribe( ( proyecto: ProyectoModel ) => {
  
        this.grid?.instance.refresh();
  
      })
    
    }

  }

  getConfiguraciones() {

    this.crudService.getAll('configuracion').subscribe( (configuraciones: ConfiguracionProyectoModel[]) => {

      this.configuraciones = configuraciones;
      this.getColumnas();
      
    })

  }

}
