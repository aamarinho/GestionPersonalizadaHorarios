import { Component, OnInit } from '@angular/core';
import {faCalendarDay, faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {Asignatura} from '../../../models/Asignatura';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Usuario} from '../../../models/Usuario';

@Component({
  selector: 'app-registro-asignatura',
  templateUrl: './registro-asignatura.component.html',
  styleUrls: ['./registro-asignatura.component.css']
})
export class RegistroAsignaturaComponent implements OnInit {

  public asignatura: Asignatura;
  public profesores : Usuario[];
  seleccionada:string;
  iconoUsuario = faUser;
  iconoEmail = faEnvelope;
  iconoApellidos = faIdCard;
  mostrarbien:boolean;
  mostrarmal:boolean;
  mensaje:string;

  constructor(private asignaturaService : AsignaturaService, private router:Router, private usuarioService : UsuarioService) {
    this.asignatura = new Asignatura('','','',null,null,);
    this.profesores=new Array<Usuario>();
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.usuarioService.getProfesores().subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER EL EMAIL DE LOS PROFESORES");
        for( let u of result){
          this.profesores.push(u);
          //console.log(u.email);
        }
        this.seleccionada= this.profesores[0].email;
      },
      error=>{
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  registrar(){
    this.asignatura.email=window.sessionStorage.getItem('usuario');
    console.log(this.asignatura);
    this.asignaturaService.registrar(this.asignatura).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Registrada la asignatura correctamente";
        //console.log(result);
        //this.router.navigate(['/asignaturas']);
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando la asignatura";
        console.log("error registrando la asignatura");
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
