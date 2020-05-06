import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faEnvelope, faIdCard, faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public usuario: Usuario;
  iconoUsuario = faUser;
  iconoEmail = faEnvelope;
  iconoApellidos = faIdCard;
  iconoCandado = faLock;

  constructor(private usuarioServicio : UsuarioService, private router:Router) {
    this.usuario = new Usuario('','','',null,'');
  }

  ngOnInit() {
    this.usuarioServicio.getUsuario(window.sessionStorage.getItem('email')).subscribe(
      result=>{
        this.usuario.email=result['email'];
        this.usuario.nombre=result['nombre'];
        this.usuario.apellidos=result['apellidos'];
        this.usuario.tipo=result['tipo'];
        this.usuario.contrasena=result['contrasena'];
        console.log(this.usuario);
      } , error=>{
        console.log(error);
        console.log("error obteniendo al usuario");
      }
    );
  }

  editarPerfil(){
    this.usuario.tipo=window.sessionStorage.getItem('tipo');
    this.usuarioServicio.editar(this.usuario).subscribe(
      result=>{
        console.log("registro sin errores");
        this.router.navigate(['/calendario']);
      }, error=>{
        console.log("error registrando al usuario");
      }
    );
  }

}
