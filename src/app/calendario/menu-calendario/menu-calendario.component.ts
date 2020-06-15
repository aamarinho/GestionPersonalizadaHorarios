import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-calendario',
  templateUrl: './menu-calendario.component.html',
  styleUrls: ['./menu-calendario.component.css']
})
export class MenuCalendarioComponent implements OnInit {

  /**
   * tipo del usuario actual que inició sesión usado para mostrar unos botones u otros
   */
  tipo=window.sessionStorage.getItem('tipo');

  /**
   * constructor usado para instanciar objetos de esta clase pasándole el router para redireccionar a otra vista
   * @param router
   */
  constructor(public router:Router) { }

  ngOnInit() {
  }

  /**
   * redirecciona a la vista de calendario del usuario actual, almacenandolo en el sessionStorage
   */
  irACalendario(){
    window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
    this.router.navigate(['/calendario']);
  }

}
