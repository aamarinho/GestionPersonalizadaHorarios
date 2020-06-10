import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from 'protractor';
import {Usuario} from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/usuario';
  }

  login(email, contrasena): Observable<HttpResponse<Config>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + contrasena));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<Config>(this.url +"/"+email, {headers, observe: 'response'});
  }

  getEstudiantes(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/estudiantes/",{headers, responseType: 'json'});
  }

  getProfesores(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/profesores/",{headers, responseType: 'json'});
  }

  getUsuarios(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/usuarios/",{headers, responseType: 'json'});
  }

  getEstudiantesProfesor(asignatura:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/estudiantes/"+asignatura+'/',{headers, responseType: 'json'});
  }

  getEstudiantesProfesorByEmail(email:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/estudiantes/profesor/"+email+'/',{headers, responseType: 'json'});
  }

  getEstudiantesParaMatricular(asignatura:string): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/estudiantes/paramatricular/"+asignatura+'/',{headers, responseType: 'json'});
  }

  registrar(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro/",parametros,{headers, responseType: 'json'});
  }

  registrarIndividial(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro/individual/",parametros,{headers, responseType: 'json'});
  }

  editar(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  eliminar(email: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+email,{headers,responseType:'text'});
  }

  getUsuario(email: string) {
    let headers = new HttpHeaders().append('Content-Type','application/json');
    return this.http.get(this.url+"/getusuarios/"+email, {headers,responseType:'json'});
  }
}
