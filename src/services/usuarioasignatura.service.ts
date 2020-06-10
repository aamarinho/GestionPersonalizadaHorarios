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

  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/usuarioasignatura';
  }

  registrar(asignaturas: Asignatura[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignaturas',JSON.stringify(asignaturas));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar",param,{headers, responseType: 'json'});
  }

  registrarAsignaturas(asignaturas: String[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignaturas',JSON.stringify(asignaturas));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar/importacion",param,{headers, responseType: 'json'});
  }

  registrarAsignaturasProfesor(asignaturas: String[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignaturas',JSON.stringify(asignaturas));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar/importacionprofesores",param,{headers, responseType: 'json'});
  }

  registrarUsuarioAsignatura(asignatura:string,email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('asignatura',JSON.stringify(asignatura));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registrar/individual",param,{headers, responseType: 'json'});
  }

  getUsuariosAsignaturas(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  getUsuariosAsignaturasSinAsignadas(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/get/sinasignadas/"+email,{headers, responseType: 'json'});
  }

  eliminar(id: string, email: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+email+'/'+id,{headers,responseType:'text'});
  }

}
