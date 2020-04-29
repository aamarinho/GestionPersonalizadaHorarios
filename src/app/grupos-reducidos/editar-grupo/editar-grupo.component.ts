import { Component, OnInit } from '@angular/core';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {Asignatura} from '../../../models/Asignatura';
import {faCalendarDay, faIdCard} from '@fortawesome/free-solid-svg-icons';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {Router} from '@angular/router';
import {AsignaturaService} from '../../../services/asignatura.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent implements OnInit {


  public grupo: GrupoReducido;
  public asignaturas : Asignatura[];
  seleccionTipo : string;
  seleccionDia : string;
  public dias = [{ name: 'Lunes' }, { name: 'Martes' },{ name: 'Miercoles' },{ name: 'Jueves' },{ name: 'Viernes' }];
  public tipos = [{ name: 'Practica' }, { name: 'Teorica' }];
  iconoCalendario = faCalendarDay;
  iconoApellidos = faIdCard;
  public nombreasig : string;

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

    this.grupoService.getGrupo(window.sessionStorage.getItem('editar')).subscribe(
      result=>{
        this.grupo.id=result['id'];
        this.grupo.id_asignatura=result['id_asignatura'];
        window.sessionStorage.setItem('asignatura',this.grupo.id_asignatura);
        this.grupo.tipo=result['tipo'];
        if(this.grupo.tipo=="Teorica"){
          this.seleccionTipo=this.tipos[1].name;
        } else{
          this.seleccionTipo=this.tipos[0].name;
        }
        this.grupo.dia=result['dia'];
        if(this.grupo.dia=="Tuesday"){
          this.seleccionDia=this.dias[1].name;
        } else if(this.grupo.dia=="Wednesday"){
          this.seleccionDia=this.dias[2].name;
        } else if(this.grupo.dia=="Thursday"){
          this.seleccionDia=this.dias[3].name;
        } else if(this.grupo.dia=="Friday"){
          this.seleccionDia=this.dias[4].name;
        }
        this.grupo.hora_inicio=result['hora_inicio'];
        this.grupo.hora_fin=result['hora_fin'];
        this.grupo.aula=result['aula'];
        this.nombreasig=result['nombre'];
        console.log(this.grupo);
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  editarGrupo(){
    this.grupo.id_asignatura=window.sessionStorage.getItem('asignatura');
    this.grupo.tipo=this.seleccionTipo;
    this.grupo.dia=this.seleccionDia;
    this.grupoService.editar(this.grupo).subscribe(
      result=>{
        console.log(result);
        console.log(this.grupo);
        this.router.navigate(['/gruposreducidos']);
      }, error=>{
        console.log(error);
        console.log("error registrando el grupo");
      }
    );
  }
}
