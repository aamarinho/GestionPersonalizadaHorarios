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
  public mostrarbien:boolean;
  public mostrarmal:boolean;
  public mensaje:string;

  constructor(private usuarioServicio : UsuarioService, private router:Router) {
    this.usuario = new Usuario('','','',null,'');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
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
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editado mi perfil correctamente";
        //this.router.navigate(['/calendario']);
      }, error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando mi perfil";
        console.log(error);
      }
    );
  }

  cambiarbien(){
    this.mostrarbien=false;
  }

  cambiarmal(){
    this.mostrarmal=false;
  }

}
