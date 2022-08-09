import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ConfiguracionProyectoModel } from '../../models/clases/configuracionProyecto.model';
import { CrudService } from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-configuracion-proyecto',
  templateUrl: './configuracion-proyecto.component.html',
  styleUrls: ['./configuracion-proyecto.component.scss']
})
export class ConfiguracionProyectoComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  configuraciones: ConfiguracionProyectoModel[] = [];

  configuracion: ConfiguracionProyectoModel = new ConfiguracionProyectoModel();

  columnas: any[] = [];

  constructor( private crudService: CrudService ) { }

  ngOnInit(): void {

    this.getConfiguraciones();
    this.getColumnas();

  }

  getColumnas() {

    this.columnas = [
      {
        dataField: 'id',
        caption: 'ID',
        dataType: 'number'
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
        dataField: 'jornadaHoras',
        caption: 'Jornada Laboral (horas)',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionSprint',
        caption: 'Duración del Sprint (días)',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'recursosAnalisis',
        caption: 'Nº Recursos Análisis',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'recursosDesarrollo',
        caption: 'Nº Recursos Desarrollo',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'recursosGestion',
        caption: 'Nº Recursos Gestión',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'recursosCalidad',
        caption: 'Nº Recursos Calidad',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionSprintPlanning',
        caption: 'Duración Sprint Planning',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionSprintReview',
        caption: 'Duración Sprint Review',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionRetrospectiva',
        caption: 'Duración Retrospectiva',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionDaily',
        caption: 'Duración Daily',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionSeguimientoSemanal',
        caption: 'Duración Seguimiento Semanal',
        dataType: 'number',
        validationRules: [
          {
            type: 'required',
            message: 'Campo obligatorio'
          }
        ],
      },
      {
        dataField: 'duracionComiteOperativo',
        caption: 'Duración Comite Operativo',
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

  getConfiguraciones() {

    this.crudService.getAll('configuracion').subscribe( (configuraciones: ConfiguracionProyectoModel[]) => {

      this.configuraciones = configuraciones;
      this.getColumnas();
      
    })

  }

  logInsertEvent( e: ConfiguracionProyectoModel ) {

    this.configuracion.nombre = e.nombre;

    this.configuracion.jornadaHoras = e.jornadaHoras;

    this.configuracion.duracionSprint = e.duracionSprint;

    this.configuracion.recursosAnalisis = e.recursosAnalisis;

    this.configuracion.recursosDesarrollo = e.recursosDesarrollo;

    this.configuracion.recursosGestion = e.recursosGestion;
    
    this.configuracion.recursosCalidad = e.recursosCalidad;

    this.configuracion.duracionSprintPlanning = e.duracionSprintPlanning;

    this.configuracion.duracionSprintReview = e.duracionSprintReview;

    this.configuracion.duracionRetrospectiva = e.duracionRetrospectiva;

    this.configuracion.duracionDaily = e.duracionDaily;
    
    this.configuracion.duracionSeguimientoSemanal = e.duracionSeguimientoSemanal;

    this.configuracion.duracionComiteOperativo = e.duracionComiteOperativo;

    this.crudService.addNew('configuracion', 'añadida', this.configuracion).subscribe( (resp: ConfiguracionProyectoModel) => {

      this.getConfiguraciones();

    })
  }

  logRemovingEvent( e: ConfiguracionProyectoModel ) {

    this.crudService.deleteById('configuracion', 'eliminada', e.id).subscribe( (resp) =>{

      this.getConfiguraciones();

    })
    
  }

  logUpdatingEvent( e: any ) {

    let newData: ConfiguracionProyectoModel = e.newData;

    let oldData: ConfiguracionProyectoModel = e.oldData;

    let updatedConfiguracion: ConfiguracionProyectoModel = new ConfiguracionProyectoModel();

    let updatedConfiguracionId: number = updatedConfiguracion.id = e.key;

    newData.nombre ? updatedConfiguracion.nombre = newData.nombre : updatedConfiguracion.nombre = oldData.nombre;

    newData.jornadaHoras ? updatedConfiguracion.jornadaHoras = newData.jornadaHoras : updatedConfiguracion.jornadaHoras = oldData.jornadaHoras;
    
    newData.duracionSprint ? updatedConfiguracion.duracionSprint = newData.duracionSprint : updatedConfiguracion.duracionSprint = oldData.duracionSprint;

    newData.recursosAnalisis ? updatedConfiguracion.recursosAnalisis = newData.recursosAnalisis : updatedConfiguracion.recursosAnalisis = oldData.recursosAnalisis;

    newData.recursosDesarrollo ? updatedConfiguracion.recursosDesarrollo = newData.recursosDesarrollo : updatedConfiguracion.recursosDesarrollo = oldData.recursosDesarrollo;

    newData.recursosGestion ? updatedConfiguracion.recursosGestion = newData.recursosGestion : updatedConfiguracion.recursosGestion = oldData.recursosGestion;

    newData.recursosCalidad ? updatedConfiguracion.recursosCalidad = newData.recursosCalidad : updatedConfiguracion.recursosCalidad = oldData.recursosCalidad;

    newData.duracionSprintPlanning ? updatedConfiguracion.duracionSprintPlanning = newData.duracionSprintPlanning : updatedConfiguracion.duracionSprintPlanning = oldData.duracionSprintPlanning;

    newData.duracionSprintReview ? updatedConfiguracion.duracionSprintReview = newData.duracionSprintReview : updatedConfiguracion.duracionSprintReview = oldData.duracionSprintReview;

    newData.duracionRetrospectiva ? updatedConfiguracion.duracionRetrospectiva = newData.duracionRetrospectiva : updatedConfiguracion.duracionRetrospectiva = oldData.duracionRetrospectiva;

    newData.duracionDaily ? updatedConfiguracion.duracionDaily = newData.duracionDaily : updatedConfiguracion.duracionDaily = oldData.duracionDaily;

    newData.duracionSeguimientoSemanal ? updatedConfiguracion.duracionSeguimientoSemanal = newData.duracionSeguimientoSemanal : updatedConfiguracion.duracionSeguimientoSemanal = oldData.duracionSeguimientoSemanal;

    newData.duracionComiteOperativo ? updatedConfiguracion.duracionComiteOperativo = newData.duracionComiteOperativo : updatedConfiguracion.duracionComiteOperativo = oldData.duracionComiteOperativo;

    if ( updatedConfiguracionId ) {
      
      this.crudService.updateById('configuracion', 'editada', updatedConfiguracion).subscribe( ( configuracion: ConfiguracionProyectoModel ) => {

        this.grid?.instance.refresh();

      })
    }
    
  }

}
