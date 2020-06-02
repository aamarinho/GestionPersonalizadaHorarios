import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {Usuario} from '../../../models/Usuario';
import {faCalendarDay, faEnvelope, faIdCard, faList, faPaperclip, faUser} from '@fortawesome/free-solid-svg-icons';
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
  iconoUsuario = faUser;
  iconoEmail = faEnvelope;
  iconoApellidos = faIdCard;
  iconolista=faList;
  iconoClip=faPaperclip;
  public nombreu : string;
  public apellidos : string;
  public mostrarbien:boolean;
  public mostrarmal:boolean;
  public mensaje:string;

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
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editada la asignatura correctamente";
        this.router.navigate(['/asignaturas']);
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando la asignatura";
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
