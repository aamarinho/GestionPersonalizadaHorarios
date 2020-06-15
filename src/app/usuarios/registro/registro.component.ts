import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faCalendarDay, faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  /**
   * variable usada para almacenar el nuevo usuario para registrar en el sistema
   */
  public usuario: Usuario;
  /**
   * icono de usuario mostrado en el formulario
   */
  iconoUsuario = faUser;
  /**
   * icono de email mostrado en el formulario
   */
  iconoEmail = faEnvelope;
  /**
   * icono apellidos mostrado en el formulario
   */
  iconoApellidos = faIdCard;
  /**
   * variable usada para almacenar el tipo del usuario que se desea registrar
   */
  public tipo :string;
  /**
   * booleano que muestra o no la caja verde del correcto funcionamiento
   */
  public mostrarbien:boolean;
  /**
   * booleano que muestra o no la caja roja del incorrecto funcionamiento
   */
  public mostrarmal:boolean;
  /**
   * mensaje que va en alguna de las cajas
   */
  public mensaje:string;

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto usuarioService
   * y el router para redireccionar a otra vista
   * @param usuarioServicio
   * @param router
   */
  constructor(private usuarioServicio : UsuarioService, private router:Router) {
    this.usuario = new Usuario('','','',null,'');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  /**
   * primer método que se ejecuta al cargar la vista utilizado para inicializar los booleanos
   * y el mensaje a vacío, además de recuperar del sessionStorage el tipo de usuario que se desea
   * registrar
   */
  ngOnInit() {
    this.mensaje='';
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.tipo=window.sessionStorage.getItem('tipousuario');
  }

  /**
   * método usado para registrar el usuario almacenado en la variable usuario
   */
  registrar(){
    this.usuario.tipo=window.sessionStorage.getItem('tipousuario');
    this.usuario.contrasena=this.usuario.nombre;
    this.usuarioServicio.registrarIndividial(this.usuario).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Usuario registrado correctamente";
      } , error=>{
        console.log(error);
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Error registrando al usuario";
      }
    );
  }

  /**
   * método usado para cerrar la caja verde del correcto funcionamiento
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método usado para cerrar la caja roja del incorrecto funcionamiento
   */
  cambiarmal(){
    this.mostrarmal=false;
  }

  /**
   * método usado para cuando se pulsa el botón de volver redireccionar la vista
   * dependiendo del usuario que se esté registrando
   */
  volver(){
    if(window.sessionStorage.getItem('tipousuario')=='2'){
      this.router.navigate(['/profesores']);
    } else if(window.sessionStorage.getItem('tipousuario')=='3'){
      this.router.navigate(['/estudiantes']);
    } else{
      this.router.navigate(['/usuarios']);
    }
  }
}
