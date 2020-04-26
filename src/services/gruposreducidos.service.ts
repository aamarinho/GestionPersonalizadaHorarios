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
    let headers = new HttpHeaders().append('Content-Type', 'application/json');//añade a la peticion HTTP la cabecera 'Content-Type' junto con su contenido (que va a ser tipo json)
    return this.http.get(this.url+"/grupos",{headers, responseType: 'json'}); //devuelve un observable (es lo que conecta con el map de UsuarioRest)
  }

  registrar(gruporeducido: GrupoReducido): Observable<any>{
    let parametros = 'grupo='+JSON.stringify(gruporeducido);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registro",parametros,{headers, responseType: 'json'});
  }

  eliminar(id: string): Observable<any>{
    return this.http.delete(this.url+"/eliminar/"+id,{responseType:'text'});
  }
}
