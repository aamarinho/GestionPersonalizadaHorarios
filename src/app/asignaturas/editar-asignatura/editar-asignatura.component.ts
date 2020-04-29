import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {Usuario} from '../../../models/Usuario';
import {faCalendarDay, faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-editar-asignatura',
  templateUrl: './editar-asignatura.component.html',
  styleUrls: ['./editar-asignatura.component.css']
})
export class EditarAsignaturaComponent implements OnInit {

  public idasignatura=window.sessionStorage.getItem('editar');
  public asignatura: Asignatura;
  public profesores : Usuario[];
  seleccionada:string;
  iconoUsuario = faUser;
  iconoCalendario = faCalendarDay;
  iconoEmail = faEnvelope;
  iconoApellidos = faIdCard;
  public nombreu : string;
  public apellidos : string;

  constructor(private asignaturaService : AsignaturaService, private router:Router, private usuarioService : UsuarioService) {
    this.asignatura = new Asignatura('','','',null,null,);
    this.profesores=new Array<Usuario>();
  }

  ngOnInit() {
    this.asignaturaService.getAsignatura(window.sessionStorage.getItem('editar')).subscribe(
      result=>{
        this.asignatura.id=result['id'];
        this.asignatura.nombre=result['nombrea'];
        this.asignatura.email=result['email'];
        window.sessionStorage.setItem('usuario',this.asignatura.email);
        this.asignatura.curso=result['curso'];
        this.asignatura.cuatrimestre=result['cuatrimestre'];
        this.nombreu=result['nombreu'];
        this.apellidos=result['apellidos'];
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  editarAsignatura(){
    this.asignatura.email=window.sessionStorage.getItem('usuario');
    this.asignaturaService.editar(this.asignatura).subscribe(
      result=>{
        console.log("registro sin errores");
        this.router.navigate(['/asignaturas']);
      } , error=>{
        console.log("error registrando al usuario");
      }
    );
  }
}
