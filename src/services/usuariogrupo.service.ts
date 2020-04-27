import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoReducido} from '../models/GrupoReducido';

@Injectable({
  providedIn: 'root'
})
export class UsuariogrupoService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/usuariogrupo';
  }

  getUsuariosGrupos(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  getUsuariosGruposEstudiante(email: string,email2:string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/getgrupos/"+email+'/'+email2,{headers, responseType: 'json'});
  }

  getUsuariosGruposProfesor(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/getgrupos/profesor/"+email+'/',{headers, responseType: 'json'});
  }

  registrar(grupos: GrupoReducido[],email:string): Observable<any>{
    let param = new HttpParams().set('email',JSON.stringify(email)).set('grupos',JSON.stringify(grupos));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registrar",param,{headers, responseType: 'json'});
  }

  eliminar(id: string, email: string): Observable<any>{
    return this.http.delete(this.url+"/eliminar/"+email+'/'+id,{responseType:'text'});
  }

}
