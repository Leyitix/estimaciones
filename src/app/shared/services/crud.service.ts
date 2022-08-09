import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  nombre: string = '';
  id: number = 0;

  private url = environment.dev;

  constructor( private http: HttpClient,
               private notifications: NotificationsService ) { }

  // urlApi = proyecto o modulo
  getAll( urlApi: string ): Observable<any[]> {

    return this.http.get<any[]>(`${this.url}/${urlApi}`)
  
  }

  getAllById( urlApi: string, id: number, embeded: string ): Observable<any[]> {

    return this.http.get<any[]>(`${this.url}/${urlApi}/${id}/${embeded}`)
  
  }

  getData( urlApi: string, id: number ): Observable<any> {

    return this.http.get<any>(`${this.url}/${urlApi}${id}`)

  }

  getById( urlApi: string, id: number ): Observable<any> {

    return this.http.get<any>(`${this.url}/${urlApi}/${id}`)

  }

  addNew( urlApi: string, accion: string, data: any  ): Observable<any> {

    const res = new ReplaySubject<boolean>(1);

    this.http.post<any>(`${this.url}/${urlApi}`, data).subscribe( 
      
      ( data ) => {

      this.nombre = data.nombre;

      this.id = data.id;

      this.notifications.showAlert( urlApi, accion, this.nombre, this.id, 0 );

      res.next( true )

    }, ( ( error ) => {

      this.notifications.showAlert( urlApi, accion, '', 0, error.status );

      res.next( false )

    }) )

    return res;
  }

  deleteById( urlApi: string, accion: string, id: number ) {
    
    const res = new BehaviorSubject<boolean | undefined>(undefined);

    this.http.delete<any[]>(`${this.url}/${urlApi}/${id}`).subscribe(
      
      ( data: any ) => {
        
        this.nombre = data.nombre;

        this.id = data.id;

        this.notifications.showAlert( urlApi, accion, this.nombre, this.id, 0 );

        res.next( true ) ;

      },

      ( error ) => {

        this.notifications.showAlert( urlApi, accion, '', 0, error.status );

        res.next( false );

      }

    );

    return res;

  }

  updateById( urlApi: string, accion: string, data: any  ): Observable<any> {

    const res = new BehaviorSubject<boolean | undefined>(undefined);

    this.http.put<any>(`${this.url}/${urlApi}/${data.id}`, data).subscribe( 
      
      ( data ) => {

      this.nombre = data.nombre;

      this.id = data.id;
      
      this.notifications.showAlert( urlApi, accion, this.nombre, this.id, 0 );

      res.next( true )

    }, ( ( error ) => {

      this.notifications.showAlert( urlApi, accion, '', 0, error.status );
      
      res.next( false )

    }) )

    return res;
    
  }

}
