import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DevExtremeModule } from 'devextreme-angular';
import { VisualizarProyectoComponent } from './creacion/visualizar-proyecto.component';




@NgModule({
  declarations: [
    VisualizarProyectoComponent
  ],
  imports: [
    CommonModule,
    DevExtremeModule
  ]
})
export class VisualizarProyectoModule { }
