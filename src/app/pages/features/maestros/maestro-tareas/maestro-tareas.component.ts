import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FasesModel } from '../../models/clases/fases.model';
import { TareasModel } from '../../models/clases/tareas.model';

@Component({
  selector: 'app-maestro-tareas',
  templateUrl: './maestro-tareas.component.html',
  styleUrls: ['./maestro-tareas.component.scss']
})
export class MaestroTareasComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  tareas: TareasModel[] = [];

  tarea: TareasModel = new TareasModel();

  fases: FasesModel[] = [];

  columnas: any[] = [];

  tipoDesarrollo: string[] = ['FRONTEND', 'BACKEND']

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {

    this.getTareas();
    this.getFases();

  }

  getColumnas() {

    this.columnas = [
      {
        dataField: 'id',
        caption: 'ID',
        dataType: 'number'
      },
      {
        dataField: 'faseId',
        caption: 'Fase',
        selector: true,
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
        lookup: {

          dataSource: this.fases,

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
        dataField: 'numHoras',
        caption: 'Horas',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          // },
          // {
          //   type: 'custom',
          //   message: 'Campo obligatorio',
          //   validationCallBack: () => {
          //     if (this.tarea.numHoras <=0) {
          //       return
          //     }
              
          //   }
          }
        ]
      },
      {
        dataField: 'tipoDesarrollo',
        caption: 'Tipo Desarrollo',
        selector: true,
        lookup: {

          dataSource: this.tipoDesarrollo,

        }
      },
    ]
  }

  getTareas() {

    this.crudService.getAll('tarea').subscribe((tareas: TareasModel[]) => {

      this.tareas = tareas

    })

  }

  getFases() {

    this.crudService.getAll('fase').subscribe((fases: FasesModel[]) => {

      this.fases = fases
      this.getColumnas();

    })

  }

  logInsertEvent(e: TareasModel) {

    this.tarea.nombre = e.nombre;

    this.tarea.faseId = e.faseId;

    this.tarea.numHoras = e.numHoras;

    this.tarea.tipoDesarrollo = e.tipoDesarrollo;

    this.crudService.addNew('tarea', 'añadida', this.tarea).subscribe((resp: TareasModel) => {

      this.getTareas();

    })

  }

  logRemovingEvent(e: TareasModel) {

    this.crudService.deleteById('tarea', 'eliminada', e.id).subscribe((result) => {

      this.getTareas();

    })

  }

  logUpdatingEvent(e: any) {

    let newData: TareasModel = e.newData;

    let oldData: TareasModel = e.oldData;

    let updatedTarea: TareasModel = new TareasModel();

    let updatedTareaId: number = updatedTarea.id = e.key;

    newData.nombre ? updatedTarea.nombre = newData.nombre : updatedTarea.nombre = oldData.nombre;

    newData.faseId ? updatedTarea.faseId = newData.faseId : updatedTarea.faseId = oldData.faseId;

    newData.numHoras ? updatedTarea.numHoras = newData.numHoras : updatedTarea.numHoras = oldData.numHoras;

    newData.tipoDesarrollo ? updatedTarea.tipoDesarrollo = newData.tipoDesarrollo : updatedTarea.tipoDesarrollo = oldData.tipoDesarrollo;

    if (updatedTareaId) {

      this.crudService.updateById('tarea', 'editada', updatedTarea).subscribe((tarea: TareasModel) => {

        this.grid?.instance.refresh();

      })

    }

  }

}
