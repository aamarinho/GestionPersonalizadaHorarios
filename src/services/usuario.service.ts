import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from 'protractor';
import {Usuario} from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
   * variable usada para definir la url a partir de la cual se van a realizar las peticiones a la API Rest
   */
  public url: string;

  /**
   * constructor que sirve para instanciar la clase UsuarioService, pasandole por parámetros un objeto de tipo HttpClient
   * @param http
   */
  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/usuario';
  }

  /**
   * método que permite a un usuario ya registrado en el sistema iniciar sesión a partir de su email y su contraseña
   * @param email
   * @param contrasena
   */
  login(email, contrasena): Observable<HttpResponse<Config>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + contrasena));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<Config>(this.url +"/"+email, {headers, observe: 'response'});
  }

  /**
   * método que recupera todos los estudiantes registrados en el sistema
   */
  getEstudiantes(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/estudiantes/",{headers, responseType: 'json'});
  }

  /**
   * método que recupera todos los profesores registrados en el sistema
   */
  getProfesores(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/profesores/",{headers, responseType: 'json'});
  }

  /**
   * método que recupera todos los usuarios registrados en el sistema
   */
  getUsuarios(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/usuarios/",{headers, responseType: 'json'});
  }

  /**
   * método que recupera los estudiantes matriculados en una asignatura a partir de su abreviatura
   * @param asignatura
   */
  getEstudiantesProfesor(asignatura:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/estudiantes/"+asignatura+'/',{headers, responseType: 'json'});
  }

  /**
   * método que recupera los estudiantes que cursan, mínimo, una de las asignaturas de un profesor a partir de su email
   * @param email
   */
  getEstudiantesProfesorByEmail(email:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/estudiantes/profesor/"+email+'/',{headers, responseType: 'json'});
  }

  /**
   * método que recupera todos los estudiantes del sistema, excepto los que cursan una asignatura a partir de su abreviatura
   * @param asignatura
   */
  getEstudiantesParaMatricular(asignatura:string): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/estudiantes/paramatricular/"+asignatura+'/',{headers, responseType: 'json'});
  }

  /**
   * método que importa a un usuario en el sistema a partir de un objeto de la clase Usuario
   * @param usuario
   */
  registrar(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro/",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que registra a un usuario en el sistema a partir de un objeto de la clase Usuario
   * @param usuario
   */
  registrarIndividial(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro/individual/",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que, además de editar a un usuario, permite a cada usuario editar cualquier dato de su perfil,
   * excepto su email y su tipo
   * @param usuario
   */
  editar(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  /**
   * método que elimina a un usuario del sistema a partir de su email
   * @param email
   */
  eliminar(email: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+email,{headers,responseType:'text'});
  }

  /**
   * método que recupera a un usuario del sistema a partir de su email
   * @param email
   */
  getUsuario(email: string) {
    let headers = new HttpHeaders().append('Content-Type','application/json');
    return this.http.get(this.url+"/getusuarios/"+email, {headers,responseType:'json'});
  }
}
