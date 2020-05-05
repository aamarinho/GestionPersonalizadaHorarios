import { Component, OnInit } from '@angular/core';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  iconoUsuario = faUser;
  iconoBarras = faBars;
  nombreUsuario : string;

  navbarOpen = false;
  tipo=window.sessionStorage.getItem('tipo');


  constructor(public router:Router) {
    this.nombreUsuario='';
  }

  ngOnInit() {
    if(window.sessionStorage.getItem('email')==null){//para que no pueda ir a cualquier ruta
      this.router.navigate(['']);
    }
    if(window.sessionStorage.getItem('tipo')=='1'){
      this.router.navigate(['/usuarios']);
    } else{
      this.router.navigate(['/calendario']);
    }
      this.nombreUsuario=window.sessionStorage.getItem('nombre');
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  irACalendarioEstudiante(){
    window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
    this.router.navigate(['/calendario']);
  }

  irACalendarioProfesor(){
    window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
    this.router.navigate(['/menucalendario']);
  }

  irAAsignaturas() {
    this.router.navigate(['/asignaturasprofesor']);
  }

  logout(){
    window.sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
