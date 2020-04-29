import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../models/Usuario';
import {Asignatura} from '../models/Asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/asignatura';
  }

  getAsignaturas(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');//añade a la peticion HTTP la cabecera 'Content-Type' junto con su contenido (que va a ser tipo json)
    return this.http.get(this.url+"/asignaturas",{headers, responseType: 'json'}); //devuelve un observable (es lo que conecta con el map de UsuarioRest)
  }

  getAsignatura(id: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');//añade a la peticion HTTP la cabecera 'Content-Type' junto con su contenido (que va a ser tipo json)
    return this.http.get(this.url+"/getasignatura/"+id,{headers, responseType: 'json'}); //devuelve un observable (es lo que conecta con el map de UsuarioRest)
  }

  getAsignaturasProfesor(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  registrar(asignatura: Asignatura): Observable<any>{
    let parametros = 'asignatura='+JSON.stringify(asignatura);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registro",parametros,{headers, responseType: 'json'});
  }

  editar(asignatura: Asignatura): Observable<any>{
    let parametros = 'asignatura='+JSON.stringify(asignatura);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/editar/",parametros,{headers, responseType: 'json'});
  }

  eliminar(id: string): Observable<any>{
    return this.http.delete(this.url+"/eliminar/"+id,{responseType:'text'});
  }

}
