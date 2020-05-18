import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  irAEstudiantes(){
    window.sessionStorage.setItem('tipousuario','3');
    this.router.navigate(['/estudiantes'])
  }
  irAProfesores(){
    window.sessionStorage.setItem('tipousuario','2');
    this.router.navigate(['/profesores'])
  }
}
