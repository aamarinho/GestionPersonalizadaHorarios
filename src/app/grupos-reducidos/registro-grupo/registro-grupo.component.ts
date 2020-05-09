import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faCalendarDay, faEnvelope, faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Router} from '@angular/router';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {Usuario} from '../../../models/Usuario';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-registro-grupo',
  templateUrl: './registro-grupo.component.html',
  styleUrls: ['./registro-grupo.component.css']
})
export class RegistroGrupoComponent implements OnInit {


  public grupo: GrupoReducido;
  public asignaturas : Asignatura[];
  seleccionTipo : string;
  seleccionDia : string;
  public dias = [{ name: 'Lunes' }, { name: 'Martes' },{ name: 'Miercoles' },{ name: 'Jueves' },{ name: 'Viernes' }];
  public tipos = [{ name: 'Practica' }, { name: 'Teorica' }];
  iconoCalendario = faCalendarDay;
  iconoApellidos = faIdCard;
  public mostrarbien:boolean;
  public mostrarmal:boolean;
  public mensaje:string;

  constructor(private grupoService : GruposreducidosService, private router:Router, private asignaturaService : AsignaturaService) {
    this.grupo = new GrupoReducido('','','','','','','');
    this.asignaturas=new Array<Asignatura>();
    this.seleccionDia=this.dias[0].name;
    this.seleccionTipo=this.tipos[0].name;
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.grupo.hora_inicio={hour:9,minute:0};
    this.grupo.hora_fin={hour:9,minute:0};
  }

  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.asignaturaService.getAsignaturas().subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LOS IDS DE ASIGNATURA");
        for( let a of result){
          this.asignaturas.push(a);
          console.log(a.id);
        }
      },
      error=>{
        console.log(this.asignaturas);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  registrar(){
    this.grupo.hora_inicio=this.grupo.hora_inicio['hour']+':'+this.grupo.hora_inicio['minute']+':'+this.grupo.hora_inicio['second'];
    this.grupo.hora_fin=this.grupo.hora_fin['hour']+':'+this.grupo.hora_fin['minute']+':'+this.grupo.hora_fin['second'];
    this.grupo.id_asignatura=window.sessionStorage.getItem('asignatura');
    this.grupo.tipo=this.seleccionTipo;
    this.grupo.dia=this.seleccionDia;
    if(this.grupo.dia=="Lunes"){
      this.grupo.dia="Monday";
    } else if(this.grupo.dia=="Martes"){
      this.grupo.dia="Tuesday";
    } else if(this.grupo.dia=="Miercoles"){
      this.grupo.dia="Wednesday";
    } else if(this.grupo.dia=="Jueves"){
      this.grupo.dia="Thursday";
    } else{
      this.grupo.dia="Friday";
    }
    this.grupoService.registrar(this.grupo).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Registrado el grupo reducido correctamente";
        //this.router.navigate(['/gruposreducidos']);
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando el grupo reducido";
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
