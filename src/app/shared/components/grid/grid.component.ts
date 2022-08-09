import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() datos: any[] = [];
  @Input() columnas: any[] = [];
  @Input() model: any;

  @Output() emitInsertData = new EventEmitter<any>();
  @Output() emitDeleteData = new EventEmitter<any>();
  @Output() emitUpdateData = new EventEmitter<any>();


  isVisible = false;
  type = 'info';
  message = '  ';

  showFilterRow: boolean = true;
  currentFilter: any;

  loadingVisible = false;

  operationDescriptions = {
    
    contains:'Contiene',
    notContains: 'No contiene',
    startsWith: 'Empieza por',
    endsWith: 'Termina por',
    equal: 'Igual',
    notEqual: 'Diferente de'

  }

  constructor() { }

  ngOnInit(): void {
    
  }


  getData( datosSelector: any ) {

    return datosSelector;

  }

  validarSelector(esSelector: any) {
    
    return esSelector === true ? true : false;

  }

  // Insertar un registro
  emitInsertEvent(e: any) {

    this.emitInsertData.emit(e);

  }


  // Eliminar proyecto
  emitRemovingEvent(e: any) {

    this.emitDeleteData.emit(e);

  }


  onEditorPreparing(e: any) {

    if (e.parentType !== "dataRow" || e.dataField !== "id") { return; }
    e.editorOptions.readOnly = "id";

  }

  onRowUpdating(e: any) {
    
    this.emitUpdateData.emit(e);

  }

}
