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
    let headers = new HttpHeaders().append('Content-Type', 'application/json');//añade a la peticion HTTP la cabecera 'Content-Type' junto con su contenido (que va a ser tipo json)
    return this.http.get(this.url+"/estudiantes/",{headers, responseType: 'json'}); //devuelve un observable (es lo que conecta con el map de UsuarioRest)
  }

  getProfesores(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/profesores/",{headers, responseType: 'json'});
  }

  getUsuarios(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/usuarios/",{headers, responseType: 'json'});
  }

  getEstudiantesProfesor(asignatura:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/get/estudiantes/"+asignatura+'/',{headers, responseType: 'json'});
  }

  getEstudiantesProfesorByEmail(email:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/get/estudiantes/profesor/"+email+'/',{headers, responseType: 'json'});
  }

  registrar(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registro/",parametros,{headers, responseType: 'json'});
  }

  editar(usuario: Usuario): Observable<any>{
    let parametros = 'usuario='+JSON.stringify(usuario);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  eliminar(email: string): Observable<any>{
    return this.http.delete(this.url+"/eliminar/"+email,{responseType:'text'});
  }

  getUsuario(email: string) {
    let headers = new HttpHeaders().append('Content-Type','application/json');
    return this.http.get(this.url+"/getusuarios/"+email, {headers,responseType:'json'});
  }
}
