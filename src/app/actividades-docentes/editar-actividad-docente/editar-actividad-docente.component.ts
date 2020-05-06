import { Component, OnInit } from '@angular/core';
import {Calendario} from '../../../models/Calendario';
import {faCalendarDay, faIdCard} from '@fortawesome/free-solid-svg-icons';
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

  constructor(private calendarioService : CalendarioService, private router:Router) {
    this.calendario=new Calendario('','','','','','','','','');
  }

  ngOnInit() {
    this.calendarioService.getActividadDocente(window.sessionStorage.getItem('editar')).subscribe(
      result=>{
        this.calendario.id=result['id'];
        this.calendario.nombre=result['nombre'];
        this.calendario.id_grupo=result['id_grupo'];
        window.sessionStorage.setItem('grupo',result['id_grupo']);
        this.calendario.id_asignatura=result['id_asignatura'];
        this.calendario.fecha=result['fecha'];
        this.calendario.hora_inicio=result['hora_inicio'];
        this.calendario.hora_fin=result['hora_fin'];
        this.calendario.responsable=result['responsable'];
        this.calendario.aula=result['aula'];
        console.log(this.calendario);
      } , error=>{
        console.log(error);
        console.log("error obteniendo al usuario");
      }
    );
  }

  editar(){
    this.calendario.id_asignatura=null;
    this.calendario.id_grupo=window.sessionStorage.getItem('grupo');
    this.calendario.responsable=window.sessionStorage.getItem('email');
    this.calendarioService.editarActividadDocente(this.calendario).subscribe(
      result=>{
        console.log(result);
        this.router.navigate(['/actividadesdocentes']);
      } , error=>{
        console.log(error);
      }
    );
  }

}
