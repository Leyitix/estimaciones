import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FasesModel } from '../../models/clases/fases.model';

@Component({
  selector: 'app-maestro-fases',
  templateUrl: './maestro-fases.component.html',
  styleUrls: ['./maestro-fases.component.scss']
})
export class MaestroFasesComponent implements OnInit {

@ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent | undefined;

  fases: FasesModel[] = [];
  fase: FasesModel = new FasesModel();

  columnas: any[] = [];

  constructor( private crudService: CrudService ) { }

  ngOnInit(): void {

    this.getColumnas();
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
        dataField: 'nombre', 
        caption: 'Nombre',
        dataType: 'string'
      }
    ]
  }

  getFases() {

    this.crudService.getAll( 'fase' ).subscribe( ( fases: FasesModel[] ) => {
      
      this.fases = fases
   
    })

  }

  logInsertEvent(e: FasesModel) {

    this.fase.nombre = e.nombre;

    this.crudService.addNew('fase', 'añadida', this.fase).subscribe((resp: FasesModel) => {

      this.getFases();

    })

  }

  logRemovingEvent(e: FasesModel) {

    this.crudService.deleteById('fase', 'eliminada', e.id).subscribe((result) => {

      this.getFases();

    })

  }

  logUpdatingEvent(e: any) {

    let newData: FasesModel = e.newData;

    let oldData: FasesModel = e.oldData;

    let updatedFase: FasesModel = new FasesModel();

    let updatedFaseId: number = updatedFase.id = e.key;

    let nombre = newData.nombre ? updatedFase.nombre = newData.nombre : updatedFase.nombre = oldData.nombre;
    
    if ( updatedFaseId ) {
      
      this.crudService.updateById('fase', 'editado', updatedFase ).subscribe( ( fase: FasesModel ) => {
  
        this.grid?.instance.refresh();
  
      })
    
    }

  }



}
