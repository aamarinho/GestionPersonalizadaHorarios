import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {Usuario} from '../../../models/Usuario';
import {faCalendarDay, faEnvelope, faIdCard, faList, faPaperclip, faUser} from '@fortawesome/free-solid-svg-icons';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-editar-asignatura',
  templateUrl: './editar-asignatura.component.html',
  styleUrls: ['./editar-asignatura.component.css']
})
export class EditarAsignaturaComponent implements OnInit {

  public idasignatura=window.sessionStorage.getItem('editar');
  /**
   * objeto Asignatura que va a ser editado en el sistema
   */
  public asignatura: Asignatura;
  /**
   * array de profesores para seleccionar el nuevo responsable de la asignatura
   */
  public profesores : Usuario[];
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
   * variable usada para recoger el nombre del profesor ya asignado
   */
  public nombreu : string;
  /**
   * variable usada para recoger los apellidos del profesor ya asignado
   */
  public apellidos : string;
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
   * constructor que sirve para instanciar esta clase a partir de un objeto AsignaturaService, el router
   * para redirecciona a otra vista y un objeto UsuarioService
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
   * primer método que se ejecuta al cargar la vista, donde se va a obtener la asignatura que se va a editar
   */
  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.asignaturaService.getAsignatura(window.sessionStorage.getItem('editar')).subscribe(
      result=>{
        this.asignatura.id=result['id'];
        this.asignatura.nombre=result['nombrea'];
        this.asignatura.email=result['email'];
        window.sessionStorage.setItem('usuario',this.asignatura.email);
        this.asignatura.curso=result['curso'];
        this.asignatura.cuatrimestre=result['cuatrimestre'];
        this.nombreu=result['nombreu'];
        this.apellidos=result['apellidos'];
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que llama al servicio para editar una asignatura
   */
  editarAsignatura(){
    this.asignatura.email=window.sessionStorage.getItem('usuario');
    this.asignaturaService.editar(this.asignatura).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editada la asignatura correctamente";
        this.router.navigate(['/asignaturas']);
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando la asignatura";
        console.log(error);
      }
    );
  }

  /**
   * método que cierra la caja verde del correcto funcionamiento
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método que cierra la caja roja del incorrecto funcionamiento
   */
  cambiarmal(){
    this.mostrarmal=false;
  }
}
