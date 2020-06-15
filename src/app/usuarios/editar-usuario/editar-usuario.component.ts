import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  /**
   * variable usada para almacenar el usuario a editar
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
   * constructor usado para instanciar objetos de esta clase a partir de un objeto de la clase
   * usuarioService y el router para redireccionar a otra vista
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
   * primer método que se ejecuta cuando se carga la vista para guardar en la variable
   * usuario el usuario que se va a editar
   */
  ngOnInit() {
    this.mensaje='';
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.tipo=window.sessionStorage.getItem('tipousuario');
    this.usuarioServicio.getUsuario(window.sessionStorage.getItem('editar')).subscribe(
      result=>{
        this.usuario.email=result['email'];
        this.usuario.nombre=result['nombre'];
        this.usuario.apellidos=result['apellidos'];
        this.usuario.tipo=result['tipo'];
        this.usuario.contrasena=result['contrasena'];
      } , error=>{
        console.log(error);
      }
    );
  }

  /**
   * método usado para editar al usuario a partir de la variable usuario
   */
  editarUsuario(){
    this.usuario.tipo=window.sessionStorage.getItem('tipousuario');
    this.usuario.contrasena=this.usuario.nombre;
    this.usuarioServicio.editar(this.usuario).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        if(window.sessionStorage.getItem('tipousuario')=='2'){
          this.mensaje="Profesor editado correctamente";
        } else if(window.sessionStorage.getItem('tipousuario')=='3'){
          this.mensaje="Estudiante editado correctamente";
        } else{
          this.mensaje="Usuario editado correctamente";
        }
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        if(window.sessionStorage.getItem('tipousuario')=='2'){
          this.mensaje="Ocurrió un error editando al profesor";
        } else if(window.sessionStorage.getItem('tipousuario')=='3'){
          this.mensaje="Ocurrió un error editando al estudiante";
        } else{
          this.mensaje="Ocurrió un error editando al usuario";
        }
        console.log(error);
      }
    );
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
   * método usado para redireccionar a otra vista dependiendo del usuario que se esté
   * registrando
   */
  volver() {
    if(window.sessionStorage.getItem('tipousuario')=='2'){
      this.router.navigate(['/profesores']);
    } else if(window.sessionStorage.getItem('tipousuario')=='3'){
      this.router.navigate(['/estudiantes']);
    } else{
      this.router.navigate(['/usuarios']);
    }
  }
}
