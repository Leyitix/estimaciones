import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  isVisible = false;
  type = 'info';
  message = '  ';

  constructor() { }


  showAlert( modelo: string, accion: string, nombre: string, id: number, status?: number ) {

    switch ( status ) {
      case 404:
        this.addErrorAlert( modelo, accion );
        break;
      case 0:
          this.addSuccesAlert( modelo, accion, nombre, id );
          break;
    }
    
  }


  addErrorAlert( modelo: string, accion: string  ) {
    
    const type = 'error';

    const text = modelo == 'funcionalidad' ? 'La ' + modelo + ' no ha podido ser ' + accion + ', contacte con el administrador' : 
                           'El ' + modelo + ' no ha podido ser ' + accion + ', contacte con el administrador';

    console.log( text );
      
    this.type = type;
    this.message = text;
    this.isVisible = true;
    
  }

  addSuccesAlert( modelo: string, accion: string, nombre: string, id: number ) {
    
    const type = 'sucess';
    
    const text = modelo == 'funcionalidad' ? 'La ' + modelo + ' ' + id + ' - ' + nombre + ' ha sido ' + accion + ' con éxito' :
                                             'El ' + modelo + ' ' + id + ' - ' + nombre + ' ha sido ' + accion + ' con éxito';

    console.log( text );
      
    this.type = type;
    this.message = text;
    this.isVisible = true;
    
  }

}


