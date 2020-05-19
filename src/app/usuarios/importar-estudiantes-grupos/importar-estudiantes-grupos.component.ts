import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import * as XLSX from 'xlsx';
import {UsuarioService} from '../../../services/usuario.service';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';
import {GrupoReducido} from '../../../models/GrupoReducido';
import{faIdCard} from '@fortawesome/free-solid-svg-icons';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {Router, Routes} from '@angular/router';
import {UsuarioasignaturaService} from '../../../services/usuarioasignatura.service';

@Component({
  selector: 'app-importar-estudiantes-grupos',
  templateUrl: './importar-estudiantes-grupos.component.html',
  styleUrls: ['./importar-estudiantes-grupos.component.css']
})
export class ImportarEstudiantesGruposComponent implements OnInit {

  asignaturas:String[];
  asignaturasAsignadas:String[];
  grupos: String[];
  gruposasignatura1:number;
  gruposasignatura2:number;
  gruposasignatura3:number;
  gruposasignatura4:number;
  gruposasignatura5:number;
  gruposasignatura6:number;
  gruposasignatura7:number;
  gruposasignatura8:number;
  gruposasignatura9:number;
  gruposasignatura10:number;
  diferente:boolean;
  iconoApellidos=faIdCard;
  mensaje:string;
  mostrarbien:boolean;
  mostrarmal:boolean;
  mostrarinfo:boolean;

  constructor(private usuarioService : UsuarioService,private usuarioGrupoService : UsuariogrupoService, private grupoReducidoService:GruposreducidosService,private usuarioAsignaturaService:UsuarioasignaturaService,private router:Router) {
    this.asignaturas=new Array<String>();
    this.asignaturasAsignadas=new Array<String>();
    this.gruposasignatura1=0;
    this.gruposasignatura2=0;
    this.gruposasignatura3=0;
    this.gruposasignatura4=0;
    this.gruposasignatura5=0;
    this.gruposasignatura6=0;
    this.gruposasignatura7=0;
    this.gruposasignatura8=0;
    this.gruposasignatura9=0;
    this.gruposasignatura10=0;
    this.diferente=false;//aqui
    this.grupos=new Array<String>();
    this.mensaje='';
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mostrarinfo=true;
  }

  onFileChange(ev) {

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let data1 = Object.keys(jsonData).map(key=>jsonData[key]);

      console.log(data1);
      for( let e of data1){//guardar asignaturas
        for(let e2 of e){
          this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
          if(e2[Object.keys(e2)[5]]!=undefined){
            this.diferente=true;
          }
          break;
        }
      }
      this.grupoReducidoService.countGrupos(this.asignaturas[0]).subscribe(
        result=>{
          this.gruposasignatura1=result['contador'];
          this.asignaturas.splice(0,this.asignaturas.length);
          for( let e of data1){
            for(let e2 of e){
              this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
              this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
              console.log(this.asignaturas);
              this.grupoReducidoService.countGrupos(this.asignaturas[1]).subscribe(
                result=>{
                  this.gruposasignatura2=result['contador'];
                  this.asignaturas.splice(0,this.asignaturas.length);
                  for( let e of data1){
                    for(let e2 of e){
                      this.gruposasignatura2=this.gruposasignatura1+this.gruposasignatura2;
                      this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                      this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                      this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                      console.log(this.asignaturas);
                      this.grupoReducidoService.countGrupos(this.asignaturas[2]).subscribe(
                        result=>{
                          this.gruposasignatura3=result['contador'];
                          this.asignaturas.splice(0,this.asignaturas.length);
                          for( let e of data1){
                            for(let e2 of e){
                              this.gruposasignatura3=this.gruposasignatura2+this.gruposasignatura3;
                              this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                              this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                              this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                              this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                              console.log(this.asignaturas);
                              this.grupoReducidoService.countGrupos(this.asignaturas[3]).subscribe(
                                result=>{
                                  this.gruposasignatura4=result['contador'];
                                  this.asignaturas.splice(0,this.asignaturas.length);
                                  for( let e of data1){
                                    for(let e2 of e){
                                      this.gruposasignatura4=this.gruposasignatura3+this.gruposasignatura4;
                                      this.gruposasignatura5=this.gruposasignatura4+this.gruposasignatura5+this.gruposasignatura1;
                                      this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                                      this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                                      this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                                      this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                                      this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));

                                      //console.log(e2['__EMPTY_'+this.gruposasignatura5]);
                                      //if(e2['__EMPTY_'+this.gruposasignatura5]!=undefined){
                                      console.log(this.asignaturas);

                                      if(this.diferente==true){
                                        this.grupoReducidoService.countGrupos(this.asignaturas[4]).subscribe(
                                          result=>{
                                            console.log("HOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLI");
                                            this.gruposasignatura5=result['contador'];
                                            this.asignaturas.splice(0,this.asignaturas.length);
                                            for( let e of data1){
                                              for(let e2 of e){
                                                this.gruposasignatura5=this.gruposasignatura4+this.gruposasignatura5;
                                                this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));
                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura5].replace(' ',''));
                                                console.log(this.asignaturas);
                                                this.grupoReducidoService.countGrupos(this.asignaturas[5]).subscribe(
                                                  result=>{
                                                    this.gruposasignatura6=result['contador'];
                                                    this.asignaturas.splice(0,this.asignaturas.length);
                                                    for( let e of data1){
                                                      for(let e2 of e){
                                                        this.gruposasignatura6=this.gruposasignatura6+this.gruposasignatura5;
                                                        this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));
                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura5].replace(' ',''));
                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura6].replace(' ',''));
                                                        console.log(this.asignaturas);
                                                        this.grupoReducidoService.countGrupos(this.asignaturas[6]).subscribe(
                                                          result=>{
                                                            this.gruposasignatura7=result['contador'];
                                                            this.asignaturas.splice(0,this.asignaturas.length);
                                                            for( let e of data1){
                                                              for(let e2 of e){
                                                                this.gruposasignatura7=this.gruposasignatura6+this.gruposasignatura7;
                                                                this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura5].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura6].replace(' ',''));
                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura7].replace(' ',''));
                                                                console.log(this.asignaturas);
                                                                this.grupoReducidoService.countGrupos(this.asignaturas[7]).subscribe(
                                                                  result=>{
                                                                    this.gruposasignatura8=result['contador'];
                                                                    this.asignaturas.splice(0,this.asignaturas.length);
                                                                    for( let e of data1){
                                                                      for(let e2 of e){
                                                                        this.gruposasignatura8=this.gruposasignatura8+this.gruposasignatura7;
                                                                        this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura5].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura6].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura7].replace(' ',''));
                                                                        this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura8].replace(' ',''));
                                                                        console.log(this.asignaturas);
                                                                        this.grupoReducidoService.countGrupos(this.asignaturas[8]).subscribe(
                                                                          result=>{
                                                                            this.gruposasignatura9=result['contador'];
                                                                            this.asignaturas.splice(0,this.asignaturas.length);
                                                                            for( let e of data1){
                                                                              for(let e2 of e){
                                                                                this.gruposasignatura9=this.gruposasignatura9+this.gruposasignatura8;
                                                                                this.gruposasignatura10=this.gruposasignatura9+this.gruposasignatura10+1;
                                                                                this.asignaturas.push(e2['__EMPTY'].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura5].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura6].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura7].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura8].replace(' ',''));
                                                                                this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura9].replace(' ',''));
                                                                                console.log(this.asignaturas);

                                                                                for( let e of data1){
                                                                                  for(let e2 of e){
                                                                                    var nombre=e2[Object.keys(e2)[0]];
                                                                                    if(!nombre || typeof nombre === "string" && nombre.includes(",")){//Obtengo nombre apellidos y email de cada estudiante para registrarlos
                                                                                      var apellidonombre=nombre.split(',');
                                                                                      var nombreapellido = apellidonombre[1]+' '+apellidonombre[0];
                                                                                      var usuarionombre=apellidonombre[1].replace(' ','');
                                                                                      var usuarioapellidos=apellidonombre[0];
                                                                                      var iniciales = nombreapellido.replace(',','').split(/\s/).reduce((response,Word)=> response+=Word.slice(0,1),'').toLowerCase();
                                                                                      var segundoapellido=apellidonombre[0].split(/\s/);
                                                                                      segundoapellido=segundoapellido[segundoapellido.length-1];
                                                                                      segundoapellido=segundoapellido.substr(1,segundoapellido.length);
                                                                                      var email=iniciales+segundoapellido;
                                                                                      email=email.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                                                                                      email=email+'@esei.uvigo.es';
                                                                                      var actual = new Usuario(email,usuarionombre,usuarioapellidos,3,usuarionombre);
                                                                                      //console.log(actual);
                                                                                      //registrar a los alumnos
                                                                                      /*this.usuarioService.registrar(actual).subscribe(
                                                                                        result=>{
                                                                                          console.log("bien");
                                                                                        } , error=>{
                                                                                          this.mostrarbien=false;
                                                                                          this.mostrarmal=true;
                                                                                          this.mensaje="Ocurrió un error registrando los estudiantes";
                                                                                          console.log(error);
                                                                                        }
                                                                                      );*/
                                                                                    }
                                                                                  }
                                                                                }

                                                                                for( let e of data1){
                                                                                  for(let e2 of e){
                                                                                    var nombre=e2[Object.keys(e2)[0]];
                                                                                    if(!nombre || typeof nombre === "string" && nombre.includes(",")){//Obtengo nombre apellidos y email de cada estudiante para registrarlos
                                                                                      var apellidonombre=nombre.split(',');
                                                                                      var nombreapellido = apellidonombre[1]+' '+apellidonombre[0];
                                                                                      var iniciales = nombreapellido.replace(',','').split(/\s/).reduce((response,Word)=> response+=Word.slice(0,1),'').toLowerCase();
                                                                                      var segundoapellido=apellidonombre[0].split(/\s/);
                                                                                      segundoapellido=segundoapellido[segundoapellido.length-1];
                                                                                      segundoapellido=segundoapellido.substr(1,segundoapellido.length);
                                                                                      var email=iniciales+segundoapellido;
                                                                                      email=email.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                                                                                      email=email+'@esei.uvigo.es';
                                                                                      this.grupos.splice(0,this.grupos.length);
                                                                                      this.asignaturasAsignadas.splice(0,this.asignaturasAsignadas.length);
                                                                                      this.comprobarAsignaturasYGrupos(e2,email,this.diferente);
                                                                                    }
                                                                                  }
                                                                                }


                                                                                break;
                                                                              }
                                                                            }
                                                                          },
                                                                          error=>{
                                                                            console.log(error);
                                                                          });
                                                                        break;
                                                                      }
                                                                    }
                                                                  },
                                                                  error=>{
                                                                    console.log(error);
                                                                  });
                                                                break;
                                                              }
                                                            }
                                                          },
                                                          error=>{
                                                            console.log(error);
                                                          });
                                                        break;
                                                      }
                                                    }
                                                  },
                                                  error=>{
                                                    console.log(error);
                                                  });
                                                break;
                                              }
                                            }
                                          },
                                          error=>{
                                            console.log(error);
                                          });
                                     }


                                      if(this.diferente==false) {
                                        for (let e of data1) {
                                          for (let e2 of e) {
                                            var nombre = e2[Object.keys(e2)[0]];
                                            if (!nombre || typeof nombre === "string" && nombre.includes(",")) {//Obtengo nombre apellidos y email de cada estudiante para registrarlos
                                              var apellidonombre = nombre.split(',');
                                              var nombreapellido = apellidonombre[1] + ' ' + apellidonombre[0];
                                              var usuarionombre = apellidonombre[1].replace(' ', '');
                                              var usuarioapellidos = apellidonombre[0];
                                              var iniciales = nombreapellido.replace(',', '').split(/\s/).reduce((response, Word) => response += Word.slice(0, 1), '').toLowerCase();
                                              var segundoapellido = apellidonombre[0].split(/\s/);
                                              segundoapellido = segundoapellido[segundoapellido.length - 1];
                                              segundoapellido = segundoapellido.substr(1, segundoapellido.length);
                                              var email = iniciales + segundoapellido;
                                              email = email.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                                              email = email + '@esei.uvigo.es';
                                              var actual = new Usuario(email, usuarionombre, usuarioapellidos, 3, usuarionombre);
                                              //console.log(actual);
                                              //registrar a los alumnos
                                              /*this.usuarioService.registrar(actual).subscribe(
                                                result=>{
                                                  console.log("bien");
                                                } , error=>{
                                                  this.mostrarbien=false;
                                                  this.mostrarmal=true;
                                                  this.mensaje="Ocurrió un error registrando los estudiantes";
                                                  console.log(error);
                                                }
                                              );*/
                                            }
                                          }
                                        }

                                        for (let e of data1) {
                                          for (let e2 of e) {
                                            var nombre = e2[Object.keys(e2)[0]];
                                            if (!nombre || typeof nombre === "string" && nombre.includes(",")) {//Obtengo nombre apellidos y email de cada estudiante para registrarlos
                                              var apellidonombre = nombre.split(',');
                                              var nombreapellido = apellidonombre[1] + ' ' + apellidonombre[0];
                                              var iniciales = nombreapellido.replace(',', '').split(/\s/).reduce((response, Word) => response += Word.slice(0, 1), '').toLowerCase();
                                              var segundoapellido = apellidonombre[0].split(/\s/);
                                              segundoapellido = segundoapellido[segundoapellido.length - 1];
                                              segundoapellido = segundoapellido.substr(1, segundoapellido.length);
                                              var email = iniciales + segundoapellido;
                                              email = email.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                                              email = email + '@esei.uvigo.es';
                                              this.grupos.splice(0, this.grupos.length);
                                              this.asignaturasAsignadas.splice(0, this.asignaturasAsignadas.length);
                                              this.comprobarAsignaturasYGrupos(e2, email, this.diferente);
                                            }
                                          }
                                        }


                                      }

                                      break;
                                    }
                                  }
                                },
                                error=>{
                                  console.log(error);
                                });
                              break;
                            }
                          }
                        },
                        error=>{
                          console.log(error);
                        });
                      break;
                    }
                  }
                },
                error=>{
                  console.log(error);
                });
              break;
            }
          }
        },
        error=>{
          console.log(error);
        });



      /*const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString;
      this.setDownload(dataString);*/
    };
    reader.readAsBinaryString(file);
  }

  comprobarAsignaturasYGrupos(value,email,diferente){
    console.log(this.asignaturas);
    let asignatura=this.asignaturas[0];
    let grupo='';
    let grupogrande='';

    let a=1;
    if(value['__EMPTY']=='X' || value['__EMPTY']=='x'){
      grupo=asignatura+'_1';
      grupogrande=asignatura+'_GG';
      this.grupos.push(grupo);
      this.grupos.push(grupogrande);
      this.asignaturasAsignadas.push(asignatura);
    } else{
      while(a<this.gruposasignatura1){
        if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
          grupo=asignatura+'_'+(a+1);
          grupogrande=asignatura+'_GG';
          this.grupos.push(grupo);
          this.grupos.push(grupogrande);
          this.asignaturasAsignadas.push(asignatura);
        }
        a++;
      }
    }
    a=this.gruposasignatura1;

    let b=1;
    while(a<this.gruposasignatura2){
      if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
        asignatura=this.asignaturas[1];
        grupo=asignatura+'_'+b;
        grupogrande=asignatura+'_GG';
        this.grupos.push(grupo);
        this.grupos.push(grupogrande);
        this.asignaturasAsignadas.push(asignatura);
      }
      b++;
      a++;
    }
    a=this.gruposasignatura2;
    b=1;
    while(a<this.gruposasignatura3){
      if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
        asignatura=this.asignaturas[2];
        grupo=asignatura+'_'+b;
        grupogrande=asignatura+'_GG';
        this.grupos.push(grupo);
        this.grupos.push(grupogrande);
        this.asignaturasAsignadas.push(asignatura);
      }
      a++;
      b++
    }
    a=this.gruposasignatura3;
    b=1;
    while(a<this.gruposasignatura4){
      if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
        asignatura=this.asignaturas[3];
        grupo=asignatura+'_'+b;
        grupogrande=asignatura+'_GG';
        this.grupos.push(grupo);
        this.grupos.push(grupogrande);
        this.asignaturasAsignadas.push(asignatura);
      }
      b++;
      a++;
    }
    a=this.gruposasignatura4;
    b=1;
    while(a<this.gruposasignatura5){
      if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
        asignatura=this.asignaturas[4];
        grupo=asignatura+'_'+b;
        grupogrande=asignatura+'_GG';
        this.grupos.push(grupo);
        this.grupos.push(grupogrande);
        this.asignaturasAsignadas.push(asignatura);
      }
      b++;
      a++;
    }
    //if(diferente==true){
      a=this.gruposasignatura5;
      b=1;
      while(a<this.gruposasignatura6){
        if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
          asignatura=this.asignaturas[5];
          grupo=asignatura+'_'+b;
          grupogrande=asignatura+'_GG';
          this.grupos.push(grupo);
          this.grupos.push(grupogrande);
          this.asignaturasAsignadas.push(asignatura);
        }
        b++;
        a++;
      }
      a=this.gruposasignatura6;
      b=1;
      while(a<this.gruposasignatura7){
        if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
          asignatura=this.asignaturas[6];
          grupo=asignatura+'_'+b;
          grupogrande=asignatura+'_GG';
          this.grupos.push(grupo);
          this.grupos.push(grupogrande);
          this.asignaturasAsignadas.push(asignatura);
        }
        b++;
        a++;
      }
      a=this.gruposasignatura7;
      b=1;
      while(a<this.gruposasignatura8){
        if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
          asignatura=this.asignaturas[7];
          grupo=asignatura+'_'+b;
          grupogrande=asignatura+'_GG';
          this.grupos.push(grupo);
          this.grupos.push(grupogrande);
          this.asignaturasAsignadas.push(asignatura);
        }
        b++;
        a++;
      }
      a=this.gruposasignatura8;
      b=1;
      while(a<this.gruposasignatura9){
        if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
          asignatura=this.asignaturas[8];
          grupo=asignatura+'_'+b;
          grupogrande=asignatura+'_GG';
          this.grupos.push(grupo);
          this.grupos.push(grupogrande);
          this.asignaturasAsignadas.push(asignatura);
        }
        b++;
        a++;
      }
      a=this.gruposasignatura9;
      b=1;
      while(a<this.gruposasignatura10){
        if(value['__EMPTY_'+a]=='X' || value['__EMPTY_'+a]=='x'){
          asignatura=this.asignaturas[9];
          grupo=asignatura+'_'+b;
          grupogrande=asignatura+'_GG';
          this.grupos.push(grupo);
          this.grupos.push(grupogrande);
          this.asignaturasAsignadas.push(asignatura);
        }
        b++;
        a++;
      }
    //}
    console.log(email);
    console.log(this.grupos);
    /*console.log(this.asignaturasAsignadas);

    this.usuarioAsignaturaService.registrarAsignaturas(this.asignaturasAsignadas,email).subscribe(
      result=>{
        console.log("BIEEN ASIGNATURAS");
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando las asignaturas";
        console.log(error);
      }
    );

    this.usuarioGrupoService.registrarImportacion(this.grupos,email).subscribe(
      result=>{
        console.log("BIEEN GRUPOS");
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando los grupos";
        console.log(error);
      }
    );*/

   // document.getElementById('output').innerHTML = "DATOS IMPORTADOS";
    this.mostrarbien=true;
    this.mensaje="Importados todos los datos correctamente";
    console.log("-----------------------------------------------------------");
  }


  ngOnInit(){
    this.mensaje='';
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mostrarinfo=true;
  }

  cambiarbien(){
    this.mostrarbien=false;
  }

  cambiarmal(){
    this.mostrarmal=false;
  }

  cambiarinfo(){
    this.mostrarinfo=false;
  }

}
