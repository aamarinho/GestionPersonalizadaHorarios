import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asignatura} from '../models/Asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase AsignaturaService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/asignatura';
  }

  /**
   * método que recupera todas las asignaturas registradas en el sistema
   */
  getAsignaturas(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/asignaturas",{headers, responseType: 'json'});
  }

  /**
   * método que recupera una asignatura a partir de su id, es decir, su abreviatura
   * @param id
   */
  getAsignatura(id: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/getasignatura/"+id,{headers, responseType: 'json'});
  }

  /**
   * método que recupera las asignaturas que imparte un profesor a partir de su email
   * @param email
   */
  getAsignaturasProfesor(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  /**
   * método que registra a una asignatura en el sistema pasándole por parámetros un objeto de tipo Asignatura
   * @param asignatura
   */
  registrar(asignatura: Asignatura): Observable<any>{
    let parametros = 'asignatura='+JSON.stringify(asignatura);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que edita todos los campos, excepto el id, de una asignatura, pasándole por parámetros un objeto de la clase Asignatura
   * @param asignatura
   */
  editar(asignatura: Asignatura): Observable<any>{
    let parametros = 'asignatura='+JSON.stringify(asignatura);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que elimina una asignatura del sistema a partir de su id, es decir, su abreviatura
   * @param id
   */
  eliminar(id: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+id,{headers,responseType:'text'});
  }

}
