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

  constructor(private grupoService : GruposreducidosService, private router:Router, private asignaturaService : AsignaturaService) {
    this.grupo = new GrupoReducido('','','','','','','');
    this.asignaturas=new Array<Asignatura>();
    this.seleccionDia=this.dias[0].name;
    this.seleccionTipo=this.tipos[0].name;
  }

  ngOnInit() {
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
    this.grupo.id_asignatura=window.sessionStorage.getItem('asignatura');
    this.grupo.tipo=this.seleccionTipo;
    this.grupo.dia=this.seleccionDia;
    this.grupoService.registrar(this.grupo).subscribe(
      result=>{
        console.log(result);
        console.log(this.grupo);
        this.router.navigate(['/gruposreducidos']);
      } , error=>{
        console.log("error registrando el grupo");
      }
    );
  }

}
