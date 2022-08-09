import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts.component';
import { DevExtremeModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AlertsComponent
  ],
  imports: [
    CommonModule,
    DevExtremeModule
  ]
})
export class AlertsModule { }
