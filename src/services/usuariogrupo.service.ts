import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoReducido} from '../models/GrupoReducido';

@Injectable({
  providedIn: 'root'
})
export class UsuariogrupoService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase UsuariogrupoService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/usuariogrupo';
  }

  /**
   * método que obtiene todos los grupos reducidos a los que está asignado un usuario a partir de su email
   * @param email
   */
  getUsuariosGrupos(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  /**
   * método que obtiene todos los grupos reducidos del sistema excepto a los que está asignado un usuario a partir de su email
   * @param email
   */
  getUsuariosGruposSinAsignados(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/sinasignados/"+email,{headers, responseType: 'json'});
  }

  /**
   * método que recupera todos los grupos a los que está asignado un estudiante (email) de una asignatura
   * @param asignatura
   * @param email2
   */
  getUsuariosGruposEstudiante(asignatura: string,email2:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/getgrupos/"+asignatura+'/'+email2,{headers, responseType: 'json'});
  }

  /**
   * método que recupera los grupos reducidos de una asignatura exceptuando los que ya imparte
   * @param asignatura
   * @param email
   */
  getUsuariosGruposProfesor(asignatura: string,email:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/getgrupos/profesor/"+asignatura+'/'+email,{headers, responseType: 'json'});
  }

  /**
   * método que registra en el sistema a un usuario (email) junto con los grupos reducidos a los que está asignado
   * @param grupos
   * @param email
   */
  registrar(grupos: GrupoReducido[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('grupos',JSON.stringify(grupos));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registrar",param,{headers, responseType: 'json'});
  }

  /**
   * método que importa en el sistema para un email de un usuario los grupos reducidos a los que pertenece
   * @param grupos
   * @param email
   */
  registrarImportacion(grupos: String[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('grupos',JSON.stringify(grupos));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registrar/importacion",param,{headers, responseType: 'json'});
  }

  /**
   * método que le elimina a un usuario un grupo reducido al que estaba asignado
   * @param id
   * @param email
   */
  eliminar(id: string, email: string): Observable<any>{
    return this.http.delete(this.url+"/eliminar/"+email+'/'+id,{responseType:'text'});
  }

}
