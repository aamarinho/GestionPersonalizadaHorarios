import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asignatura} from '../models/Asignatura';
import {GrupoReducido} from '../models/GrupoReducido';

@Injectable({
  providedIn: 'root'
})
export class GruposreducidosService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase GruposreducidosService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/grupo';
  }

  /**
   * método que recupera todos los grupos reducidos del sistema
   */
  getGrupos(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/grupos",{headers, responseType: 'json'}); //devuelve un observable (es lo que conecta con el map de UsuarioRest)
  }

  /**
   * método que recupera un grupo a partir de su id
   * @param id
   */
  getGrupo(id: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/getgrupo/"+id,{headers, responseType: 'json'});
  }

  /**
   * método que recupera cuanto grupos reducidos tiene una asignatura, a partir de la abreviatura de la asignatura (su id)
   * @param idasignatura
   */
  countGrupos(idasignatura: String): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/countgrupos/"+idasignatura,{headers, responseType: 'json'});
  }

  /**
   * método que registra un grupo reducido en el sistema pasándole un objeto de la clase GrupoReducido
   * @param gruporeducido
   */
  registrar(gruporeducido: GrupoReducido): Observable<any>{
    let parametros = 'grupo='+JSON.stringify(gruporeducido);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que edita cualquier campo de un grupo reducido excepto su id pasándole el objeto de la clase GrupoReducido
   * que se desea modificar
   * @param grupo
   */
  editar(grupo: GrupoReducido): Observable<any>{
    let parametros = 'grupo='+JSON.stringify(grupo);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que elimina un grupo reducido del sistema a partir de su id
   * @param id
   */
  eliminar(id: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+id,{headers,responseType:'text'});
  }
}
