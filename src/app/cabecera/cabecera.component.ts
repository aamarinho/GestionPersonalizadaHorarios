import { Component, OnInit } from '@angular/core';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  /**
   * icono mostrado en la cabecera para acceder al perfil del usuario
   */
  iconoUsuario = faUser;
  /**
   * icono mostrado cuando se oculta el menu para volver a abrirlo
   */
  iconoBarras = faBars;
  /**
   * variable usada para almacenar el nombre del usuario actual
   */
  nombreUsuario : string;
  /**
   * variable usada para mostar o no el menu
   */
  navbarOpen = false;
  /**
   * tipo del usuario, obtenido del sessioStorage
   */
  tipo=window.sessionStorage.getItem('tipo');

  /**
   * constructor usado para instanciar objetos de esta clase pasándole el router para recireccionar a otra vista
   * @param router
   */
  constructor(public router:Router) {
    this.nombreUsuario='';
  }

  /**
   * primer método que se ejecuta al cargar la vista para comprobar, por seguridad, que un usuario no pueda
   * acceder a cualquier ruta
   */
  ngOnInit() {
    if(window.sessionStorage.getItem('email')==null){
      this.router.navigate(['']);
    }
    if(window.sessionStorage.getItem('tipo')=='1'){
      this.router.navigate(['/usuarios']);
    } else{
      this.router.navigate(['/calendario']);
    }
    let temp=window.sessionStorage.getItem('nombre').split(' ');
    this.nombreUsuario=temp[0];
  }

  /**
   * comprobacion para mostrar el menu
   */
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  /**
   * redirecciona a la vista de calendario del estudiante
   */
  irACalendarioEstudiante(){
    window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
    this.router.navigate(['/calendario']);
  }

  /**
   * redirecciona a la vista de calendario de profesor
   */
  irACalendarioProfesor(){
    window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
    this.router.navigate(['/menucalendario']);
  }

  /**
   * redirecciona a la vista de asignaturas del profesor
   */
  irAAsignaturas() {
    this.router.navigate(['/asignaturasprofesor']);
  }

  /**
   * cierra la sesión limpiando el sessionStorage y redireccionandolo a la vista de inicio de sesión
   */
  logout(){
    window.sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
