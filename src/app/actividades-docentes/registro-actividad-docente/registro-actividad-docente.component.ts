import { Component, OnInit } from '@angular/core';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {Asignatura} from '../../../models/Asignatura';
import {faCalendarDay, faIdCard,faClock,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {Router} from '@angular/router';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Calendario} from '../../../models/Calendario';
import {CalendarioService} from '../../../services/calendario.service';

@Component({
  selector: 'app-registro-actividad-docente',
  templateUrl: './registro-actividad-docente.component.html',
  styleUrls: ['./registro-actividad-docente.component.css']
})
export class RegistroActividadDocenteComponent implements OnInit {

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
    this.calendario.hora_inicio={hour:9,minute:0};
    this.calendario.hora_fin={hour:9,minute:0};
  }

  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  registrar(){
    this.calendario.fecha=this.calendario.fecha['year']+'/'+this.calendario.fecha['month']+'/'+this.calendario.fecha['day'];
    this.calendario.hora_inicio=this.calendario.hora_inicio['hour']+':'+this.calendario.hora_inicio['minute']+':'+this.calendario.hora_inicio['second'];
    this.calendario.hora_fin=this.calendario.hora_fin['hour']+':'+this.calendario.hora_fin['minute']+':'+this.calendario.hora_fin['second'];
    this.calendario.id_asignatura=null;
    this.calendario.id_grupo=window.sessionStorage.getItem('grupo');
    this.calendario.responsable=window.sessionStorage.getItem('email');
    this.calendarioService.registrarActividadDocente(this.calendario).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Registrada la actividad docente correctamente";
        console.log(result);
        //this.router.navigate(['/actividadesdocentes']);
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando la actividad docente";
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
