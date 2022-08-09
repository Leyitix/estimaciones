import { NgModule } from '@angular/core';

import { DxCheckBoxModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxDropDownBoxModule } from 'devextreme-angular';
import { DxGanttModule } from 'devextreme-angular';
import { DxLoadPanelModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular';
import { DxoPagingModule } from 'devextreme-angular/ui/nested';
import { DxTabPanelModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular';
import { DxToastModule } from 'devextreme-angular';
import { DxTreeViewModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';



@NgModule({
  exports: [
    DxCheckBoxModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxGanttModule,
    DxLoadPanelModule,
    DxLookupModule,
    DxoPagingModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxToastModule,
    DxTreeViewModule,
  ]
})
export class DevextremModule { }
