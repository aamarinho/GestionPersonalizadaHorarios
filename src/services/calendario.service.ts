import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoReducido} from '../models/GrupoReducido';
import {Calendario} from '../models/Calendario';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/calendario';
  }

  registrar(grupos: GrupoReducido[]): Observable<any>{
    let param = new HttpParams().set('grupos',JSON.stringify(grupos));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registrar",param,{headers, responseType: 'json'});
  }

  registrarActividadDocente(calendario:Calendario): Observable<any>{
    let param = new HttpParams().set('calendario',JSON.stringify(calendario));
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/registraractividaddocente",param,{headers, responseType: 'json'});
  }

  getCalendario(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/get/"+email,{headers, responseType: 'json'});
  }

  getEventosCalendario(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/getall",{headers, responseType: 'json'});
  }


}
