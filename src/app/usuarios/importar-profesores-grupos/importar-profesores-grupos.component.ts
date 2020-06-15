import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import {Usuario} from '../../../models/Usuario';
import {UsuarioasignaturaService} from '../../../services/usuarioasignatura.service';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';
import {UsuarioService} from '../../../services/usuario.service';
import {AsignaturaService} from '../../../services/asignatura.service';

@Component({
  selector: 'app-importar-profesores-grupos',
  templateUrl: './importar-profesores-grupos.component.html',
  styleUrls: ['./importar-profesores-grupos.component.css']
})
export class ImportarProfesoresGruposComponent implements OnInit {

  /**
   * array usado para guardar las asignaturas posteriormente asignadas a un profesor
   */
  asignaturasAsignadas:String[];
  /**
   * array usado para almacenar los grupos que imparte de una asignatura
   */
  grupos: String[];
  /**
   * mensaje mostrado en las cajas
   */
  mensaje:string;
  /**
   * booleano usado para mostrar o no la caja verde de correcto funcionamiento
   */
  mostrarbien:boolean;
  /**
   * booleano usado para mostrar o no la caja roja de incorrecto funcionamiento
   */
  mostrarmal:boolean;
  /**
   * booleano usado para mostrar o no la caja amarilla de información
   */
  mostrarinfo:boolean;

  /**
   * constructor usado para instanciar objetos de esta clase
   * @param router
   * @param usuarioAsignaturaService
   * @param asignaturaService
   * @param usuarioService
   */
  constructor(public router : Router, private usuarioAsignaturaService: UsuarioasignaturaService, private asignaturaService:AsignaturaService,private usuarioService:UsuarioService) {
    this.asignaturasAsignadas=new Array<String>();
    this.grupos=new Array<String>();
    this.mensaje='';
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mostrarinfo=true;
  }

  /**
   * método usado para almacenar en la base de datos la información del fichero Excel
   * @param ev
   */
  subirFichero(ev) {

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
            email=email+'@uvigo.es';
            var actual = new Usuario(email,usuarionombre,usuarioapellidos,2,usuarionombre);

            //registrar a los profesores
            this.usuarioService.registrar(actual).subscribe(
              result=>{
              } , error=>{
                this.mostrarbien=false;
                this.mostrarmal=true;
                this.mensaje="Ocurrió un error registrando los profesores";
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
            email=email+'@uvigo.es';
            this.grupos.splice(0,this.grupos.length);
            this.asignaturasAsignadas.splice(0,this.asignaturasAsignadas.length);
            this.comprobarAsignaturasYGrupos(e2,email);
          }
        }
      }

    };
    reader.readAsBinaryString(file);
  }

  /**
   * método usado para comprobar las asignaturas y grupos que imparte un profesor
   * @param value
   * @param email
   */
  comprobarAsignaturasYGrupos(value,email){
    let arrayAsignaturas=value['__EMPTY'].split(',');
    for(let asignatura of arrayAsignaturas){
      if(asignatura!=undefined){
        this.asignaturasAsignadas.push(asignatura);
      }
    }


    //en este servicio se va a editar el responsable de todas esas asignaturas, añadir a la tabla usuarioasignatura cada asignatura de cada profesor, y en la tabla usuarioGrupo los grupos de cada profesor
    this.usuarioAsignaturaService.registrarAsignaturasProfesor(this.asignaturasAsignadas,email).subscribe(
      result=>{
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando las asignaturas y los grupos";
        console.log(error);
      }
    );

    this.mostrarbien=true;
    this.mensaje="Importados todos los datos correctamente";
  }

  /**
   * primer método que se ejecuta al cargar la vista usado para inicializar variables
   */
  ngOnInit() {
    this.mensaje='';
    this.mostrarbien=false;
    this.mostrarmal=false;
  }

  /**
   * método usado para cerrar la caja verde de correcto funcionamiento
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método usado para cerrar la caja roja de incorrecto funcionamiento
   */
  cambiarmal(){
    this.mostrarmal=false;
  }

  /**
   * método usado para cerrar la caja amarilla de información
   */
  cambiarinfo(){
    this.mostrarinfo=false;
  }

}
