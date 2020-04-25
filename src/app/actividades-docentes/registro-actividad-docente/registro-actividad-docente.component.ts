import { Component, OnInit } from '@angular/core';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {Asignatura} from '../../../models/Asignatura';
import {faCalendarDay, faIdCard} from '@fortawesome/free-solid-svg-icons';
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

  constructor(private calendarioService : CalendarioService, private router:Router) {
    this.calendario=new Calendario('','','','','','','','','');
  }

  ngOnInit() {

  }

  registrar(){
    this.calendario.id_asignatura=null;
    this.calendario.id_grupo=window.sessionStorage.getItem('grupo');
    this.calendario.responsable=window.sessionStorage.getItem('email');
    this.calendarioService.registrarActividadDocente(this.calendario).subscribe(
      result=>{
        console.log("Registrada la actividad docente con exito");
      } , error=>{
        console.log("Error registrando la actividad docente");
      }
    );
  }

}
