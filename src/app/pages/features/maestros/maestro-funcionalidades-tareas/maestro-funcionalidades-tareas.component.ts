import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FuncionalidadModel } from '../../models/clases/funcionalidades.model';
import { FuncionalidadTareasModel } from '../../models/clases/funcionalidadTareas.model';
import { ModuloModel } from '../../models/clases/modulo.model';
import { ProyectoModel } from '../../models/clases/proyecto.model';
import { TareasModel } from '../../models/clases/tareas.model';
import { take } from 'rxjs';
import { FasesModel } from '../../models/clases/fases.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-maestro-funcionalidades-tareas',
  templateUrl: './maestro-funcionalidades-tareas.component.html',
  styleUrls: ['./maestro-funcionalidades-tareas.component.scss']
})
export class MaestroFuncionalidadesTareasComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  funcionalidadesTareas: FuncionalidadTareasModel[] = [];
  funcionalidadTarea: FuncionalidadTareasModel = new FuncionalidadTareasModel();
  funcionalidades: FuncionalidadModel[] = [];
  tareas: TareasModel[] = [];

  proyectos: ProyectoModel[] = [];
  modulos: ModuloModel[] = [];

  fases: FasesModel[] = [];

  columnas: any[] = [];

  funcionalidadId: any = 0;

  modulosByIdProyecto: any[] = [];

  funcionalidadByIdModulo: any[] = [];

  funcTareasByIdFuncionalidad: any[] = [];

  constructor(private crudService: CrudService) {

    this.funcTareasByIdFuncionalidad;
    this.modulosByIdProyecto;
    this.funcionalidadByIdModulo;

  }

  ngOnInit(): void {

    this.getFases();
    this.getTareas();
    this.getProyectos();
    this.getModulos();
    this.getFuncionalidades();
    this.getFuncionalidadesTareas();

  }

  getColumnas() {

    this.columnas = [
      {
        dataField: 'descripcionFase',
        caption: 'Fase',
        allowEditing: false,
        dataType: 'string',
        editorOptions: [
          {
            hidden: true
          }
        ]
      },
      {
        dataField: 'tipoDesarrollo',
        caption: 'Desarrollo',
        allowEditing: false,
        dataType: 'string'
      },
      {
        dataField: 'tareaId',
        caption: 'Tarea',
        selector: true,
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
        lookup: {

          dataSource: this.tareas,

          valueExpr: 'id',

          displayExpr: (e: any) => {

            return !!e && `${e.nombre}`;

          }
        }
      },
      {
        dataField: 'numTareas',
        caption: 'Nº Tareas',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      }
    ]
  }

  getFuncionalidadesTareas() {

    this.crudService.getAll('funcionalidadTarea').subscribe((funcionalidadesTareas: FuncionalidadTareasModel[]) => {

      this.funcionalidadesTareas = funcionalidadesTareas

      if (this.funcionalidadId !== 0) {

        let id: any = {};

        id.value = this.funcionalidadId;

        this.onValueChangedFuncionalidad(id)

      }

    })

  }

  getFuncionalidades() {

    this.crudService.getAll('funcionalidad').subscribe((funcionalidades: FuncionalidadModel[]) => {

      this.funcionalidades = funcionalidades

      this.getColumnas();

    })

  }

  getTareas() {

    this.crudService.getAll('tarea').subscribe((tareas: TareasModel[]) => {

      this.tareas = tareas

      this.getColumnas();

    })

  }

  getProyectos() {

    this.crudService.getAll('proyecto').subscribe((proyectos: ProyectoModel[]) => {

      this.proyectos = proyectos

    })

  }

  getModulos() {

    this.crudService.getAll('modulo').subscribe((modulos: ModuloModel[]) => {

      this.modulos = modulos

    })

  }

  getFases() {

    this.crudService.getAll('fase').subscribe((fases: FasesModel[]) => {

      this.fases = fases

    })
  }

  // módulos que pertenecen a un proyecto
  async getModulosByIdProyecto(idProyecto: number) {

    let data = await this.crudService.getData('modulo?idProyecto=', idProyecto)
      .pipe(take(1))
      .toPromise();

    return data;

  }

  // funcionalidades que pertenecen a un módulo
  async getFuncionalidadesByIdModulo(idModulo: number) {

    let data = await this.crudService.getData('funcionalidad?idModulo=', idModulo)
      .pipe(take(1))
      .toPromise();

    return data;

  }

  // funcionalidadesTarea que pertenecen a una funcionalidad
  async getFuncTareaByIdFuncionalidad(idFuncionalidadTarea: number) {

    let data = await this.crudService.getAllById('funcionalidad', idFuncionalidadTarea, 'funcionalidadTarea')
      .pipe(take(1))
      .toPromise();

    return data;

  }

  logInsertEvent(e: FuncionalidadTareasModel) {

    this.funcionalidadTarea.funcionalidadId = this.funcionalidadId;

    this.funcionalidadTarea.tareaId = e.tareaId;

    this.funcionalidadTarea.numTareas = e.numTareas;

    this.crudService.addNew('funcionalidadTarea', 'añadida', this.funcionalidadTarea).subscribe((resp: FuncionalidadTareasModel) => {

      this.getFuncionalidadesTareas();

    })

  }

  logRemovingEvent(e: FuncionalidadTareasModel) {

    this.crudService.deleteById('funcionalidadTarea', 'eliminada', e.id).subscribe((result) => {

      this.getFuncionalidadesTareas();

    })

  }

  logUpdatingEvent(e: any) {

    let newData: FuncionalidadTareasModel = e.newData;

    let oldData: FuncionalidadTareasModel = e.oldData;

    let updatedFuncTarea: FuncionalidadTareasModel = new FuncionalidadTareasModel();

    updatedFuncTarea.id = e.key;

    newData.funcionalidadId ? updatedFuncTarea.funcionalidadId = newData.funcionalidadId : updatedFuncTarea.funcionalidadId = oldData.funcionalidadId;

    newData.tareaId ? updatedFuncTarea.tareaId = newData.tareaId : updatedFuncTarea.tareaId = oldData.tareaId;

    newData.numTareas ? updatedFuncTarea.numTareas = newData.numTareas : updatedFuncTarea.numTareas = oldData.numTareas;

    this.crudService.updateById('funcionalidadTarea', 'editada', updatedFuncTarea).subscribe((funcTarea: FuncionalidadTareasModel) => {

      this.getFuncionalidadesTareas();

      this.grid?.instance.refresh();

    })

  }

  async onValueChangedProyecto(e: any) {

    let idProyecto = e.value;

    let listadoModulos: any = await this.getModulosByIdProyecto(idProyecto);
    
    this.modulos.forEach( (modulo: ModuloModel) => {

      if (idProyecto === modulo.idProyecto) {


        this.modulosByIdProyecto = listadoModulos;


      } else if (idProyecto === null) {

        this.modulosByIdProyecto = listadoModulos;

      }

    });

  }

  onValueChangedModulo(e: any) {

    this.funcionalidades.forEach(async (funcionalidad: FuncionalidadModel) => {

      if (e.value === funcionalidad.idModulo) {

        let listadoFuncionalidades: any = await this.getFuncionalidadesByIdModulo(e.value);

        this.funcionalidadByIdModulo = listadoFuncionalidades

      }

    });

  }

  async onValueChangedFuncionalidad(e: any) {

    this.funcionalidadId = e.value;

    let listadoFuncTareas: any = await this.getFuncTareaByIdFuncionalidad(e.value);

    this.funcionalidadesTareas.forEach( (funcTarea: FuncionalidadTareasModel) => {

      if (e.value === funcTarea.funcionalidadId) {
        
        this.funcTareasByIdFuncionalidad = listadoFuncTareas;
        
        listadoFuncTareas.forEach(async (funcTarea: any) => {
          
          let dataTarea: any = _.filter(this.tareas, { 'id': funcTarea.tareaId });
          funcTarea.tipoDesarrollo = dataTarea[0].tipoDesarrollo;
          
          let faseTarea = _.filter(this.fases, { 'id': dataTarea[0].faseId });
          funcTarea.descripcionFase = faseTarea[0].nombre;

          this.grid?.instance.refresh();
          
        });
        
        
      } else if (e.value != funcTarea.funcionalidadId) {

        this.funcTareasByIdFuncionalidad = listadoFuncTareas;

        this.grid?.instance.refresh();


      } else if (e.value === null) {
        
        this.grid?.instance.refresh();
        
      } 

    });

  }

}
