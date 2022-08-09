import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  @Input() prueba = true;

  // isVisible = false;
  // type = 'info';
  // message = '  ';

  constructor( private notificationsService: NotificationsService ) { }

  ngOnInit(): void {
  }

  // showAlert( modelo: string, accion: string, nombre: string, id: number, status?: number ) {

  //   switch ( status ) {
  //     case 404:
  //       this.addErrorAlert( modelo, accion );
  //       break;
  //     case 0:
  //         this.addSuccesAlert( modelo, accion, nombre, id );
  //         break;
  //   }
    
  // }

  // addErrorAlert( modelo: string, accion: string  ) {
    
  //   const type = 'error';
  //   const text = 'El ' + modelo + ' no ha podido ser ' + accion + ', contacte con el administrador';

  //   console.log( text );
      
  //   this.type = type;
  //   this.message = text;
  //   this.isVisible = true;
    
  // }

  // addSuccesAlert( modelo: string, accion: string, nombre: string, id: number ) {
    
  //   const type = 'sucess';
  //   const text = 'El ' + modelo + ' ' + id + ' - ' + nombre + ' ha sido ' + accion + ' con éxito';

  //   console.log( text );
      
  //   this.type = type;
  //   this.message = text;
  //   this.isVisible = true;
    
  // }

  // // showSuccess(): void {

  // //   this.notificationsService.showAlert('', '', '', 0, 0);
  // // }

  // // showInfo(): void {

  // // }

  // // showWarning(): void {

  // // }

  // // showError(): void {

  // // }

}
