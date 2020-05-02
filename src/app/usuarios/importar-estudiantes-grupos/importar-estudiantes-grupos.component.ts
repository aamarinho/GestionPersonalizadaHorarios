import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import * as XLSX from 'xlsx';
import {UsuarioService} from '../../../services/usuario.service';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';
import {GrupoReducido} from '../../../models/GrupoReducido';

@Component({
  selector: 'app-importar-estudiantes-grupos',
  templateUrl: './importar-estudiantes-grupos.component.html',
  styleUrls: ['./importar-estudiantes-grupos.component.css']
})
export class ImportarEstudiantesGruposComponent implements OnInit {

  willDownload = false;
  asignaturas:String[];
  grupos: String[];
  gruposasignatura1:number;
  gruposasignatura2:number;
  gruposasignatura3:number;
  gruposasignatura4:number;
  gruposasignatura5:number;

  constructor(private usuarioService : UsuarioService,private usuarioGrupoService : UsuariogrupoService) {
    this.asignaturas=new Array<String>();
    this.gruposasignatura1=8;
    this.gruposasignatura2=8+this.gruposasignatura1;
    this.gruposasignatura3=8+this.gruposasignatura2;
    this.gruposasignatura4=8+this.gruposasignatura3;
    this.gruposasignatura5=8+this.gruposasignatura4;
    this.grupos=new Array<String>();
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
          this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura1].replace(' ',''));
          this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura2].replace(' ',''));
          this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura3].replace(' ',''));
          this.asignaturas.push(e2['__EMPTY_'+this.gruposasignatura4].replace(' ',''));
          break;
        }
      }

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
            this.usuarioService.registrar(actual).subscribe(
              result=>{
                console.log("bien");
              } , error=>{
                console.log(error);
              }
            );
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
            this.comprobarGrupo(e2,email);
          }
        }
      }

      /*const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString;
      this.setDownload(dataString);*/
    };
    reader.readAsBinaryString(file);
  }

  comprobarGrupo(value,email){
    let asignatura=this.asignaturas[0];
    let grupo='';
    let a=1;
    if(value['__EMPTY']=='X'){
      grupo=asignatura+'_1';
      this.grupos.push(grupo);
    } else{
      while(a<this.gruposasignatura1){
        if(value['__EMPTY_'+a]=='X'){
          grupo=asignatura+'_'+(a+1);
          this.grupos.push(grupo);
        }
        a++;
      }
    }
    a=8;

    let b=1;
    while(a<this.gruposasignatura2){
      if(value['__EMPTY_'+a]=='X'){
        asignatura=this.asignaturas[1];
        grupo=asignatura+'_'+b;
        this.grupos.push(grupo);
      }
      b++;
      a++;
    }
    a=16;
    b=1;
    while(a<this.gruposasignatura3){
      if(value['__EMPTY_'+a]=='X'){
        asignatura=this.asignaturas[2];
        grupo=asignatura+'_'+b;
        this.grupos.push(grupo);
      }
      a++;
      b++
    }
    a=24;
    b=1;
    while(a<this.gruposasignatura4){
      if(value['__EMPTY_'+a]=='X'){
        asignatura=this.asignaturas[3];
        grupo=asignatura+'_'+b;
        this.grupos.push(grupo);
      }
      b++;
      a++;
    }
    a=32;
    b=1;
    while(a<this.gruposasignatura5){
      if(value['__EMPTY_'+a]=='X'){
        asignatura=this.asignaturas[4];
        grupo=asignatura+'_'+b;
        this.grupos.push(grupo);
      }
      b++;
      a++;
    }
    console.log(email);
    console.log(this.grupos);
    this.usuarioGrupoService.registrarImportacion(this.grupos,email).subscribe(
      result=>{
        console.log("BIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN");
        console.log(this.grupos);
        console.log(email);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      } , error=>{
        console.log("MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL");
        console.log(error);
        console.log(this.grupos);
        console.log(email);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      }
    );

    console.log("-----------------------------------------------------------");
  }

  /*setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }*/

  ngOnInit(): void {
  }

}
