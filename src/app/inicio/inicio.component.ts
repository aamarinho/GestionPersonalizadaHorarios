import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {CabeceraComponent} from '../cabecera/cabecera.component';
import {error} from 'util';

@Component({
  providers: [CabeceraComponent],
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  /**
   * variable utilizada para almacenar el contenido del usuario que inicia sesión
   */
  public usuario: Usuario;
  /**
   * icono de usuario mostrado en la vista
   */
  iconoUsuario = faUser;
  /**
   * icono de candado mostrado en la vista
   */
  iconoCandado = faLock;
  /**
   * booleano que muestra o no la caja roja del incorrecto funcionamiento
   */
  public mostrarmal:boolean;
  /**
   * mensaje que va en alguna de las cajas
   */
  public mensaje:string;

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto UsuarioService, el
   * router para redireccionar a otra vista y el componente de cabecera
   * @param usuarioService
   * @param router
   * @param comp
   */
  constructor(private usuarioService: UsuarioService, private router: Router, private comp: CabeceraComponent) {
    this.usuario = new Usuario('','','',null,'');
    this.mostrarmal=false;
    this.mensaje='';
  }

  /**
   * primer método que se ejecuta al cargar la vista, donde se va a eliminar la imagen de fondo
   */
  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  /**
   * método que se ejecuta al pulsar el botón para iniciar sesión que llama a login
   */
  onSubmit() {
    this.login();
  }

  /**
   * método que llama al servicio para comprobar si ese usuario y contraseña están registrados
   * en el sistema y pueden iniciar sesión
   */
  login(){
    this.usuarioService.login(this.usuario.email,this.usuario.contrasena).subscribe(
      result=>{
        if(result.status===200) {
          document.body.classList.remove('bg-img');
          window.sessionStorage.setItem("email",result.body.email);
          window.sessionStorage.setItem("contrasena",result.body.contrasena);
          window.sessionStorage.setItem("nombre",result.body.nombre);
          window.sessionStorage.setItem("tipo",result.body.tipo);
          if(result.body.tipo==1){
            this.router.navigate(['/usuarios']);//a una pagina de inicio
          } else{
            window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
            this.router.navigate(['/calendario']);
          }
        } else{
          console.log(error);
          this.mostrarmal=true;
          this.mensaje="El usuario o la contraseña son incorrectos";
        }
      },
      error=>{
        console.log(error);
        this.mostrarmal=true;
        this.mensaje="El usuario o la contraseña son incorrectos";
      }
    );
  }

  /**
   * método usado para cerrar la caja de incorrecto funcionamiento
   */
  cambiarmal(){
    this.mostrarmal=false;
  }

}
