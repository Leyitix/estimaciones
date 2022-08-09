import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ProyectoModel } from '../../models/clases/proyecto.model';
import { ModuloModel } from '../../models/clases/modulo.model';
import { FuncionalidadModel } from '../../models/clases/funcionalidades.model';
import { FuncionalidadTareasModel } from '../../models/clases/funcionalidadTareas.model';
import { FasesModel } from '../../models/clases/fases.model';
import { take } from 'rxjs';
import { TareasModel } from '../../models/clases/tareas.model';
import * as dayjs from 'dayjs';
import { ConfiguracionProyectoModel } from '../../models/clases/configuracionProyecto.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-visualizar-proyecto',
  templateUrl: './visualizar-proyecto.component.html',
  styleUrls: ['./visualizar-proyecto.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.None,
})
export class VisualizarProyectoComponent implements OnInit {

  dataTotalHoras = 0;

  proyectos: ProyectoModel[] = [];

  modulos: ModuloModel[] = [];

  funcionalidades: FuncionalidadModel[] = [];

  fases: FasesModel[] = [];

  funcionalidadesTareas: FuncionalidadTareasModel[] = [];

  tareas: TareasModel[] = [];

  idProyectoSeleccionado = 0;

  configuracionId = 0;

  columnas: any[] = ['id', 'codigo', 'nombre', 'descripcion'];

  tasks: any[] = [];

  tasks2: any[] = [];

  modulosByIdProyecto: any[] = [];

  // selector de proyecto
  gridBoxValue: number[] = [];

  // opciones gantt
  scaleType: string = '';

  titlePosition: string = '';

  showCustomTaskTooltip: any;

  startDateRange: any;

  endDateRange: any;

  // calcular
  totalHoras: number = 0;

  totalJornadas: number = 0;

  numSprints: number = 0;

  numRecursosOverview: number = 0;

  numRecursosAnalisis: number = 0;

  numRecursosDesarrollo: number = 0;

  numRecursosGestion: number = 0;

  numRecursosCalidad: number = 0;

  totalHorasPorModulo: number = 0;

  fechaFin: any;

  estimacionProyecto: number = 0;

  constructor(private crudService: CrudService) {

    this.getProyectos();

    this.tasks;

    this.scaleType = 'months';
    this.titlePosition = 'outside';
    this.showCustomTaskTooltip = true;
    this.startDateRange = new Date(2019, 11, 1);
    this.endDateRange = new Date(2030, 11, 1);

  }

  ngOnInit(): void {

    this.getModulos();
    this.getFuncionalidades();
    this.getFuncionalidadesTareas();
    this.getTareas();
    this.getFases();

  }

  async onValueChanged(proyectoSeleccionado: any) {

    debugger;

    let dataProyecto: any[] = this.setProyectoInicial(proyectoSeleccionado.value);

    dataProyecto.forEach((proyecto: ProyectoModel) => {

      this.tasks2.push(proyecto)

    });

    let configuracionById = await this.getConfigById(this.configuracionId);

    let dataModulo: any[] = this.setModulos(this.idProyectoSeleccionado);

    dataModulo.forEach( async (task) => {

      this.tasks2.push(task);

    });
    
    let listadoFuncionalidades: any = await this.setFuncionalidades(this.modulosByIdProyecto)

    let listadoFuncTareas: any = await this.setFuncTarea(listadoFuncionalidades);

    let listadoTareas: any = await this.setTareas(listadoFuncTareas);

    for (const modulo of this.modulosByIdProyecto) {

      let dataFase: any[] = this.setGantt(this.fases, modulo.nombre, listadoFuncTareas, listadoTareas, configuracionById);

      dataFase.forEach( fase => {

        debugger;

        this.tasks2.push(fase);

      });

    }

    this.tasks = this.tasks2;

    let jornadaHoras = configuracionById.jornadaHoras;

    this.totalJornadas = Math.ceil(this.dataTotalHoras / jornadaHoras);

    // nº sprints
    this.numSprints = Math.ceil(this.totalJornadas / configuracionById.duracionSprint);

    // overview
    this.numRecursosOverview = configuracionById.recursosAnalisis;

    // analisis
    this.numRecursosAnalisis = configuracionById.recursosAnalisis;

    // desarrollo
    this.numRecursosDesarrollo = configuracionById.recursosDesarrollo;

    // calidad
    this.numRecursosCalidad = configuracionById.recursosCalidad;

  }

  setProyectoInicial(proyectoSeleccionados: any) {

    let tasks: any[] = [];

    proyectoSeleccionados.forEach((proyecto: ProyectoModel) => {

      this.configuracionId = proyecto.configuracionId

      let fechaInicio: any = dayjs(new Date(proyecto.start)).subtract(1, 'day');

      let fechaFin: any = dayjs(new Date(proyecto.end)).subtract(1, 'day');

      fechaInicio = fechaInicio.$d;

      fechaFin = fechaFin.$d;

      this.idProyectoSeleccionado = proyecto.id;

      let task: any = {};

      task.id = proyecto.id;

      task.parentId = 0;

      task.title = proyecto.nombre;

      task.start = fechaInicio;

      task.end = fechaFin;

      task.progress = 100;

      tasks.push(task)


    });

    return tasks;

  }

  setModulos(idProyecto: number) {

    let tasks: any[] = [];

    let idModulo = 0;

    this.modulos.forEach(modulo => {

      if (idProyecto === modulo.idProyecto) {

        this.modulosByIdProyecto.push(modulo);

        let fechaInicio: any = dayjs(new Date(this.tasks2[0].start)).subtract(1, 'day');
  
        let fechaFin: any = dayjs(new Date(this.tasks2[0].end)).subtract(1, 'day');
  
        fechaInicio = fechaInicio.$d;
  
        fechaFin = fechaFin.$d;
  
        let data: any = {};
  
        idModulo = idModulo !== 0 ? idModulo + 1 : modulo.idProyecto + 1;
  
        data.id = idModulo;
  
        data.parentId = modulo.idProyecto;
  
        data.title = modulo.nombre;
  
        data.progress = 100;
  
        data.start = fechaInicio;
  
        data.end = fechaFin;
  
        tasks.push(data);
        
      }


    });

    return tasks;

  }

  setFuncionalidades(listadoModulos: any) {

    let listadoFuncionalidades: any[] = [];

    listadoModulos.forEach( async (modulo: ModuloModel) => {

      let funcionalidades = _.filter(this.funcionalidades, { 'idModulo': modulo.id });

      funcionalidades.forEach( (funcionalidad: FuncionalidadModel) => {

        listadoFuncionalidades.push(funcionalidad);
        
      });
    
   });

    return listadoFuncionalidades;

  }

  setFuncTarea(listadoFuncionalidades: any) {

    let listadoFuncTareas: any[] = [];

    listadoFuncionalidades.forEach( async (funcionalidad: FuncionalidadModel) => {

      let funcTareas = _.filter(this.funcionalidadesTareas, { 'funcionalidadId': funcionalidad.id });

      funcTareas.forEach( (funcTarea: FuncionalidadTareasModel) => {
        
        listadoFuncTareas.push(funcTarea)
      
      });

    });

    return listadoFuncTareas;

  }

  setTareas(listadoFuncTareas: any) {

    let listadoTareas: any[] = [];

    listadoFuncTareas.forEach( (funcTarea: FuncionalidadTareasModel) => {
      
      let tareas = _.filter(this.tareas, { 'id':  funcTarea.tareaId});

      tareas.forEach( (tarea: TareasModel) => {
        
        listadoTareas.push(tarea);

      });

    });

    return listadoTareas;

  }

  setGantt(listadoFases: any, nombreModulo: any, listadoFuncTareas: any, listadoTareas: any, configuracionById: any) {
    
    debugger;

    let taskModulo = _.filter(this.tasks2, { 'title': nombreModulo });

    let parentId = taskModulo.length > 0 ? taskModulo[0].id : 0;

    let tasks: any[] = [];
    
    let lastID = this.tasks2.length + 1;
    
    let dias = 0;

    listadoFases.forEach( (fase: FasesModel) => {

      debugger;

      let data: any = {};

      let fechaInicio: any = dayjs(new Date(this.tasks2[1].start));

      fechaInicio = fechaInicio.$d;

      dias = this.calcularHorasTareas(listadoFuncTareas, listadoTareas, fase.id, configuracionById);

      data.id = lastID;

      data.parentId = parentId;

      data.title = fase.nombre;

      data.progress = 100;

      if (fase.id === 1) {

        data.start = fechaInicio;

        data.end = this.calcularFechaFin(fechaInicio, dias);

      } else {

        data.start = this.fechaFin;

        data.end = this.calcularFechaFin(this.fechaFin, dias);

      }

      tasks.push(data);

      lastID = lastID + 1;

    });

    return tasks;

  }

  calcularHorasTareas(listadoFuncTareas: any[], listadoTareas: any[], idFase: number, configuracionById: ConfiguracionProyectoModel) {

    debugger;

    let horasTotales = 0;

    let horas = 0;

    let dias = 0;

    let jornadaHoras = 0;

    jornadaHoras = configuracionById.jornadaHoras;

    listadoFuncTareas.forEach( async (funcTarea: FuncionalidadTareasModel) => {

      let tarea: TareasModel = await this.getTareaById(listadoTareas, funcTarea.tareaId)

      if (funcTarea.tareaId === tarea.id && tarea.faseId === idFase) {
        
        horas = funcTarea.numTareas * tarea.numHoras;
    
        this.dataTotalHoras = this.dataTotalHoras + horas;
    
        horasTotales = (horasTotales + horas) / jornadaHoras;
    
        dias = Math.ceil(horasTotales)
      
      }
    
   });

        
    return dias;

  }

  calcularFechaFin(fechaInicio: Date, dias: number) {

    let fechaFin: any = dayjs(new Date(fechaInicio)).add(dias, 'day');

    fechaFin = fechaFin.$d

    this.fechaFin = fechaFin;

    return this.fechaFin;

  }

  getProyectos() {

    this.crudService.getAll('proyecto').subscribe((proyectos: ProyectoModel[]) => {

      this.proyectos = proyectos;

    })
  }

  getModulos() {

    this.crudService.getAll('modulo').subscribe((modulos: ModuloModel[]) => {

      this.modulos = modulos;

    })
  }

  getFuncionalidades() {

    this.crudService.getAll('funcionalidad').subscribe((funcionalidades: FuncionalidadModel[]) => {

      this.funcionalidades = funcionalidades;

    })
  }

  getFuncionalidadesTareas() {

    this.crudService.getAll('funcionalidadTarea').subscribe((funcionalidadesTareas: FuncionalidadTareasModel[]) => {

      this.funcionalidadesTareas = funcionalidadesTareas;

    })

  }

  getTareas() {
    
    this.crudService.getAll('tarea').subscribe((tareas: TareasModel[]) => {

      this.tareas = tareas;

    })

  }

  getTareaById(listadoTareas: any[], tareaId: number) {

    let tarea: any = {};

    listadoTareas.forEach( (data: TareasModel) => {
      
      if (data.id === tareaId) {

        tarea = data;
        
      }
      
    });

    return tarea;
    
  }

  getFases() {

    this.crudService.getAll('fase').subscribe((fases: FasesModel[]) => {

      this.fases = fases;

    })

  }




  getTimeEstimate(task: any) {

    let estimacion = Math.abs(task.start - task.end) / 36e5;

    estimacion = Math.ceil(estimacion)

    return estimacion;

  }


  async getConfigById(configuracionId: number) {
    
    let data: any = await this.crudService
    
    .getAllById('proyecto', configuracionId, 'configuracion')
    .pipe(take(1))
    .toPromise();
    
    let configuracion = _.filter(data, { 'id': configuracionId });

    return configuracion[0];

  }


  // getTimeLeft(task: any) {

  //   const timeEstimate = Math.abs(task.start - task.end) / 36e5;
  //   return Math.floor((100 - task.progress) / 100 * timeEstimate);

  // }

  // getTime(date: any) {

  //   return date.toLocaleString();

  // }



}
