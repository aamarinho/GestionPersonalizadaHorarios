import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {Observable} from 'rxjs';
import {Configuracion} from '../models/Configuracion';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase ConfiguracionService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/configuracion';
  }

  /**
   * método que recupera la configuración del sistema, es decir, cada fecha de inicio y fin de los cuatrimestres
   */
  getConfiguracion() {
    let headers = new HttpHeaders().append('Content-Type','application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get", {headers,responseType:'json'});
  }

  /**
   * método que edita cualquier fecha de la configuración del sistema pasándole un objeto de tipo Configuración
   * @param configuracion
   */
  editar(configuracion: Configuracion): Observable<any>{
    let parametros = 'configuracion='+JSON.stringify(configuracion);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/editar",parametros,{headers, responseType: 'json'});
  }
}
