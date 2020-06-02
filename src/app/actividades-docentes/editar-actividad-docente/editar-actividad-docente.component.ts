import { Component, OnInit } from '@angular/core';
import {Calendario} from '../../../models/Calendario';
import {faCalendarDay, faClock, faIdCard, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {CalendarioService} from '../../../services/calendario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editar-actividad-docente',
  templateUrl: './editar-actividad-docente.component.html',
  styleUrls: ['./editar-actividad-docente.component.css']
})
export class EditarActividadDocenteComponent implements OnInit {

  public calendario: Calendario;
  iconoCalendario = faCalendarDay;
  iconoApellidos = faIdCard;
  iconoReloj = faClock;
  iconoSitio = faMapMarkerAlt;
  mostrarbien:boolean;
  mostrarmal:boolean;
  mensaje:string;


  constructor(private calendarioService : CalendarioService, private router:Router) {
    this.calendario=new Calendario('','','','','','','','','');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.calendarioService.getActividadDocente(window.sessionStorage.getItem('editar')).subscribe(
      result=>{
        this.calendario.id=result['id'];
        this.calendario.nombre=result['nombre'];
        this.calendario.id_grupo=result['id_grupo'];
        window.sessionStorage.setItem('grupo',result['id_grupo']);
        this.calendario.id_asignatura=result['id_asignatura'];

        this.calendario.hora_inicio=result['hora_inicio'];
        let temp = this.calendario.hora_inicio.split(':');
        this.calendario.hora_inicio={hour:parseInt(temp[0],10),minute:parseInt(temp[1],10)};
        this.calendario.hora_fin=result['hora_fin'];
        temp = this.calendario.hora_fin.split(':');
        this.calendario.hora_fin={hour:parseInt(temp[0],10),minute:parseInt(temp[1],10)};

        this.calendario.fecha=result['fecha'];
        temp = this.calendario.fecha.split('-');
        this.calendario.fecha={year:parseInt(temp[0],10),month:parseInt(temp[1],10),day:parseInt(temp[2],10)};

        this.calendario.responsable=result['responsable'];
        this.calendario.aula=result['aula'];
      } , error=>{
        console.log(error);
        console.log("error obteniendo al usuario");
      }
    );
  }

  editar(){
    this.calendario.fecha=this.calendario.fecha['year']+'/'+this.calendario.fecha['month']+'/'+this.calendario.fecha['day'];
    this.calendario.hora_inicio=this.calendario.hora_inicio['hour']+':'+this.calendario.hora_inicio['minute']+':'+this.calendario.hora_inicio['second'];
    this.calendario.hora_fin=this.calendario.hora_fin['hour']+':'+this.calendario.hora_fin['minute']+':'+this.calendario.hora_fin['second'];
    this.calendario.id_asignatura=null;
    this.calendario.id_grupo=window.sessionStorage.getItem('grupo');
    this.calendario.responsable=window.sessionStorage.getItem('email');
    this.calendarioService.editarActividadDocente(this.calendario).subscribe(
      result=>{
        console.log(result);
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editada la actividad docente correctamente";
        //this.router.navigate(['/actividadesdocentes']);
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando la actividad docente";
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
