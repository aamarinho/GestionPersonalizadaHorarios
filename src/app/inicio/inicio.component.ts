import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {CabeceraComponent} from '../cabecera/cabecera.component';

@Component({
  providers: [CabeceraComponent],
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usuario: Usuario;
  iconoUsuario = faUser;
  iconoCandado = faLock;

  constructor(private usuarioService: UsuarioService, private router: Router, private comp: CabeceraComponent) {
    this.usuario = new Usuario('','','',null,'');
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  onSubmit() {
    this.login();
  }

  login(){
    console.log(this.usuario.email);
    console.log(this.usuario.contrasena);
    this.usuarioService.login(this.usuario.email,this.usuario.contrasena).subscribe(
      result=>{
        if(result.status===200) {
          console.log("OK");
          document.body.classList.remove('bg-img');
          window.sessionStorage.setItem("email",result.body.email);
          window.sessionStorage.setItem("contrasena",result.body.contrasena);
          window.sessionStorage.setItem("nombre",result.body.nombre);
          window.sessionStorage.setItem("tipo",result.body.tipo);
          if(result.body.tipo==1){
            this.router.navigate(['/usuarios']);//a una pagina de inicio
          } else{
            window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
            this.router.navigate(['/calendario']);
          }
        } else{
          console.log("NO OK");
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

}
