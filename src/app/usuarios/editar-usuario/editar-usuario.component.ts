import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public usuario: Usuario;
  iconoUsuario = faUser;
  iconoEmail = faEnvelope;
  iconoApellidos = faIdCard;
  public tipo :string;

  constructor(private usuarioServicio : UsuarioService, private router:Router) {
    this.usuario = new Usuario('','','',null,'');
  }

  ngOnInit() {
    this.tipo=window.sessionStorage.getItem('tipousuario');
    this.usuarioServicio.getUsuario(window.sessionStorage.getItem('editar')).subscribe(
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

  registrar(){
    this.usuario.tipo=window.sessionStorage.getItem('tipousuario');
    this.usuario.contrasena=this.usuario.nombre;
    this.usuarioServicio.editar(this.usuario).subscribe(
      result=>{
        console.log("registro sin errores");
        if(this.usuario.tipo==2){
          this.router.navigate(['/profesores']);
        } else if(this.usuario.tipo==3){
          this.router.navigate(['/estudiantes']);
        } else{
          this.router.navigate(['/usuarios']);
        }
      } , error=>{
        console.log("error registrando al usuario");
      }
    );
  }

}
