import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {Observable} from 'rxjs';
import {UsuarioAsignatura} from '../models/UsuarioAsignatura';
import {Asignatura} from '../models/Asignatura';
import {Config} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioasignaturaService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase UsuarioasignaturaService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/usuarioasignatura';
  }

  /**
   * método que registra en el sistema para ese email todas las asignaturas a las que está matriculado/imparte
   * @param asignaturas
   * @param email
   */
  registrar(asignaturas: Asignatura[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignaturas',JSON.stringify(asignaturas));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar",param,{headers, responseType: 'json'});
  }

  /**
   * método, que al igual que el citado justo arriba, registra en el sistema para ese email las asignaturas en
   * las que está matriculado ese estudiante
   * @param asignaturas
   * @param email
   */
  registrarAsignaturas(asignaturas: String[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignaturas',JSON.stringify(asignaturas));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar/importacion",param,{headers, responseType: 'json'});
  }

  /**
   * método que registra en el sistema para ese email de profesor todas las asignaturas que imparte
   * @param asignaturas
   * @param email
   */
  registrarAsignaturasProfesor(asignaturas: String[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignaturas',JSON.stringify(asignaturas));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar/importacionprofesores",param,{headers, responseType: 'json'});
  }

  /**
   * método que registro por parte de un profesor de un estudiante(email) junto con una asignatura que imparte ese profesor, es decir,
   * da de alta a un estudiante en una de sus asignaturas
   * @param asignatura
   * @param email
   */
  registrarUsuarioAsignatura(asignatura:string,email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignatura',JSON.stringify(asignatura));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar/individual",param,{headers, responseType: 'json'});
  }

  /**
   * método que recupera todas las asignaturas que cursa/imparte un usuario en el sistema
   * @param email
   */
  getUsuariosAsignaturas(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  /**
   * método que recupera todas las asignaturas del sistema exceptuando las que ya tiene asignadas un usuario a partir de su email
   * @param email
   */
  getUsuariosAsignaturasSinAsignadas(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/sinasignadas/"+email,{headers, responseType: 'json'});
  }

  /**
   * método que elimina del sistema una asignatura junto con su email, es decir, desmatricula a un usuario de una asignatura
   * @param id
   * @param email
   */
  eliminar(id: string, email: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+email+'/'+id,{headers,responseType:'text'});
  }

}
