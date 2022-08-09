import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevExtremeModule } from 'devextreme-angular';

import { GridComponent } from './grid/grid.component';



@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    DevExtremeModule
  ],
  exports: [
    GridComponent
  ]
})
export class ComponentsModule { }
