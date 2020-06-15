import { Component, OnInit } from '@angular/core';
import {faList, faEnvelope, faIdCard, faUser, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {Asignatura} from '../../../models/Asignatura';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Usuario} from '../../../models/Usuario';

@Component({
  selector: 'app-registro-asignatura',
  templateUrl: './registro-asignatura.component.html',
  styleUrls: ['./registro-asignatura.component.css']
})
export class RegistroAsignaturaComponent implements OnInit {

  /**
   * objeto Asignatura que va a ser registrado en el sistema
   */
  public asignatura: Asignatura;
  /**
   * array de profesores para seleccionar el responsable de la nueva asignatura
   */
  public profesores : Usuario[];
  /**
   * variable usada para coger el contenido del select de profesores
   */
  seleccionada:string;
  /**
   * icono de user mostrado en el formulario
   */
  iconoUsuario = faUser;
  /**
   * icono de idCard mostrado en el formulario
   */
  iconoCard = faIdCard;
  /**
   * icono de lista mostrado en el formulario
   */
  iconolista=faList;
  /**
   * icono de clip mostrado en el formulario
   */
  iconoClip=faPaperclip;
  /**
   * booleano usado para mostrar o no la caja verde de funcionamiento correcto
   */
  mostrarbien:boolean;
  /**
   * booleano usado para mostrar o no la caja roja de funcionamiento incorrecto
   */
  mostrarmal:boolean;
  /**
   * mensaje mostrado en cada caja
   */
  mensaje:string;

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto AsignaturaService, el router para
   * redireccionar a otra vista y un objeto UsuarioService
   * @param asignaturaService
   * @param router
   * @param usuarioService
   */
  constructor(private asignaturaService : AsignaturaService, public router:Router, private usuarioService : UsuarioService) {
    this.asignatura = new Asignatura('','','',null,null,);
    this.profesores=new Array<Usuario>();
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  /**
   * primer método que se ejecuta al cargar la vista donde se van a obtener todos los profesores del sistema
   * para seleccionar uno que va a ser el responsable de la nueva asignatura
   */
  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.usuarioService.getProfesores().subscribe(
      result=>{
        for( let u of result){
          this.profesores.push(u);
        }
        this.seleccionada= this.profesores[0].email;
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que llama al servicio de asignatura para registrar una nueva en el sistema
   */
  registrar(){
    this.asignatura.email=window.sessionStorage.getItem('usuario');
    console.log(this.asignatura);
    this.asignaturaService.registrar(this.asignatura).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Registrada la asignatura correctamente";
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando la asignatura";
        console.log(error);
      }
    );
  }

  /**
   * método que sirve para cerrar la caja verde del correcto funcionamiento pulsando la x
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método que sirve para cerrar la caja roja del incorrecto funcionamiento pulsando la x
   */
  cambiarmal(){
    this.mostrarmal=false;
  }

}
