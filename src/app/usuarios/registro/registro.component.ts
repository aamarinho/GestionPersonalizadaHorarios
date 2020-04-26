import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faCalendarDay, faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
  }

  registrar(){
    this.usuario.tipo=window.sessionStorage.getItem('tipousuario');
    this.usuario.contrasena=this.usuario.nombre;
    this.usuarioServicio.registrar(this.usuario).subscribe(
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
