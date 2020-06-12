import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  /**
   * constructor utilizado para instanciar objetos de esta clase a partir de router para redireccionar
   * a otra vista
   * @param router
   */
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * redirecciona a la vista de estudiantes y almacena en el sessionStorage el tipo de usuario
   * que se va a mostrar, en este caso, 3
   */
  irAEstudiantes(){
    window.sessionStorage.setItem('tipousuario','3');
    this.router.navigate(['/estudiantes'])
  }

  /**
   * redirecciona a la vista de profesores y almacena en el sessionStorage el tipo de usuario
   * que se va a mostrar, en este caso, 2
   */
  irAProfesores(){
    window.sessionStorage.setItem('tipousuario','2');
    this.router.navigate(['/profesores'])
  }
}
