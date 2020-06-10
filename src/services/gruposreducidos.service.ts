import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asignatura} from '../models/Asignatura';
import {GrupoReducido} from '../models/GrupoReducido';

@Injectable({
  providedIn: 'root'
})
export class GruposreducidosService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/grupo';
  }

  getGrupos(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/grupos",{headers, responseType: 'json'}); //devuelve un observable (es lo que conecta con el map de UsuarioRest)
  }

  getGrupo(id: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/getgrupo/"+id,{headers, responseType: 'json'});
  }

  countGrupos(idasignatura: String): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.get(this.url+"/countgrupos/"+idasignatura,{headers, responseType: 'json'});
  }

  registrar(gruporeducido: GrupoReducido): Observable<any>{
    let parametros = 'grupo='+JSON.stringify(gruporeducido);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/registro",parametros,{headers, responseType: 'json'});
  }

  editar(grupo: GrupoReducido): Observable<any>{
    let parametros = 'grupo='+JSON.stringify(grupo);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  eliminar(id: string): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(window.sessionStorage.getItem('email') + ':' +window.sessionStorage.getItem('contrasena')));
    return this.http.delete(this.url+"/eliminar/"+id,{headers,responseType:'text'});
  }
}
