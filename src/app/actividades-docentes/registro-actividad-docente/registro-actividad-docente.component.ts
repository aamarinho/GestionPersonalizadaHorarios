import { Component, OnInit } from '@angular/core';
import {faCalendarDay, faIdCard,faClock,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Calendario} from '../../../models/Calendario';
import {CalendarioService} from '../../../services/calendario.service';

@Component({
  selector: 'app-registro-actividad-docente',
  templateUrl: './registro-actividad-docente.component.html',
  styleUrls: ['./registro-actividad-docente.component.css']
})
export class RegistroActividadDocenteComponent implements OnInit {

  /**
   * objeto calendario que va a ser editado en la vista
   */
  public calendario: Calendario;
  /**
   * icono del calendario para mostrar en el formulario
   */
  iconoCalendario = faCalendarDay;
  /**
   * icono idcard para mostrar en el formulario
   */
  iconoCard = faIdCard;
  /**
   * icono reloj para mostrar en el formulario
   */
  iconoReloj = faClock;
  /**
   * icono localizador de un sitio para mostrar en el formulario
   */
  iconoSitio = faMapMarkerAlt;
  /**
   * booleano usado para mostrar o no la caja verde de funcionamiento correcto
   */
  mostrarbien:boolean;
  /**
   * booleano usado para mostrar o no la caja roja de funcionamiento incorrecto
   */
  mostrarmal:boolean;
  /**
   * mensaje mostrado en las cajas de correcto funcionamiento o incorrecto funcionamiento
   */
  mensaje:string;

  /**
   * constructor usado para instanciar objetos de esta clase pasándole un objeto de la clase CalendarioService y el router
   * para redireccionar a otra vista
   * @param calendarioService
   * @param router
   */
  constructor(private calendarioService : CalendarioService, public router:Router) {
    this.calendario=new Calendario('','','','','','','','','');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.calendario.hora_inicio={hour:9,minute:0};
    this.calendario.hora_fin={hour:9,minute:0};
  }

  /**
   * primer método que se ejecuta cuando se carga la vista, donde inicializamos los booleans de las cajas
   * y el mensaje a vacío
   */
  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  /**
   * método que llama al servicio del calendario para registrar una actividad docente pasándole
   * el objeto nuevo creado
   */
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
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error registrando la actividad docente";
        console.log(error);
      }
    );
  }

  /**
   * método usado para cerrar la caja verde del funcionamiento correcto al pulsar la x
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método usado para cerrar la caja roja del funcionamiento incorrecto al pulsar la x
   */
  cambiarmal(){
    this.mostrarmal=false;
  }

}
