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
      this.nombreUsuario=window.sessionStorage.getItem('nombre');
      console.log(this.nombreUsuario);
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

  irAEstudiantes(){
    this.router.navigate(['/estudiantesprofesor']);
  }

}
