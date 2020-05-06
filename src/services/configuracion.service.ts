import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {Observable} from 'rxjs';
import {Configuracion} from '../models/Configuracion';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'https://localhost/rest/configuracion';
  }

  getConfiguracion() {
    let headers = new HttpHeaders().append('Content-Type','application/json');
    return this.http.get(this.url+"/get", {headers,responseType:'json'});
  }

  editar(configuracion: Configuracion): Observable<any>{
    let parametros = 'configuracion='+JSON.stringify(configuracion);
    let headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url+"/editar",parametros,{headers, responseType: 'json'});
  }
}
