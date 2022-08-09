import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevExtremeModule } from 'devextreme-angular';

import { MaestroFuncionalidadesComponent } from './maestro-funcionalidades/maestro-funcionalidades.component';
import { MaestroModulosComponent } from './maestro-modulos/maestro-modulos.component';
import { MaestroProyectosComponent } from './maestro-proyectos/maestro-proyectos.component';
import { MaestroFasesComponent } from './maestro-fases/maestro-fases.component';
import { MaestroTareasComponent } from './maestro-tareas/maestro-tareas.component';
import { MaestroFuncionalidadesTareasComponent } from './maestro-funcionalidades-tareas/maestro-funcionalidades-tareas.component';

import { AlertsModule } from '../../../shared/components/alerts/alerts.module';
import { ComponentsModule } from '../../../shared/components/components.module';
import { ConfiguracionProyectoComponent } from './configuracion-proyecto/configuracion-proyecto.component';


@NgModule({
  declarations: [
    MaestroFuncionalidadesComponent,
    MaestroModulosComponent,
    MaestroProyectosComponent,
    MaestroFasesComponent,
    MaestroTareasComponent,
    MaestroFuncionalidadesTareasComponent,
    ConfiguracionProyectoComponent,
  ],
  imports: [
    CommonModule,
    DevExtremeModule,
    AlertsModule,
    ComponentsModule
  ],
  exports: [
    AlertsModule
  ]
})
export class MaestrosModule { }
