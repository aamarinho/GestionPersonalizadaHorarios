import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoReducido} from '../models/GrupoReducido';
import {Calendario} from '../models/Calendario';
import {Usuario} from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase CalendarioService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/calendario';
  }

  /**
   * método que registra en el sistema los eventos pertenecientes a cada grupo del array pasado por parámetros, teniendo en cuenta
   * el día de la semana, hora de inicio, hora de fin, y las fechas de inicio y fin del cuatrimestre en el que se imparte
   * @param grupos
   */
  registrar(grupos: GrupoReducido[]): Observable<any>{
    let param = new HttpParams().set('grupos',JSON.stringify(grupos));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar",param,{headers, responseType: 'json'});
  }

  /**
   * método que registra una actividad docente en el sistema a partir de un objeto de la clase Calendario
   * @param calendario
   */
  registrarActividadDocente(calendario:Calendario): Observable<any>{
    let param = new HttpParams().set('calendario',JSON.stringify(calendario));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registraractividaddocente",param,{headers, responseType: 'json'});
  }

  /**
   * método que obtiene los eventos del calendario concretos a partir de un email
   * @param email
   */
  getCalendario(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  /**
   * método que recupera todos los eventos del calendario, tanto clases como actividades docentes
   */
  getEventosCalendario(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/getall",{headers, responseType: 'json'});
  }

  /**
   * método que recupera los grupos reducidos que todavía no tienen eventos de clases generadas
   */
  getGruposSinGenerar(): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/grupos/singenerar",{headers, responseType: 'json'});
  }

  /**
   * método que elimina un evento del calendario, tanto una actividad docente como una clase a partir de un id
   * @param id
   */
  eliminar(id: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+id,{headers,responseType:'text'});
  }

  /**
   * método que recupera una actividad docente a partir de su id
   * @param id
   */
  getActividadDocente(id: string) {
    let headers = new HttpHeaders().append('Content-Type','application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/actividaddocente/"+id, {headers,responseType:'json'});
  }

  /**
   * método que edita cualquier dato de un evento, exceptuando su id, pasándole ese objeto de tipo Calendario que se desea modificar
   * @param calendario
   */
  editarActividadDocente(calendario: Calendario): Observable<any>{
    let parametros = 'calendario='+JSON.stringify(calendario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/editar/actividaddocente",parametros,{headers, responseType: 'json'});
  }

}
