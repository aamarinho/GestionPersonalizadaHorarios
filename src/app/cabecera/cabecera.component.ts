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

}
