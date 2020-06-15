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
   * constructor usado para instanciar objetos de esta clase pasándole un objeto calendarioService y el router
   * para redireccionar a otra vista
   * @param calendarioService
   * @param router
   */
  constructor(private calendarioService : CalendarioService, public router:Router) {
    this.calendario=new Calendario('','','','','','','','','');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  /**
   * primer método que se ejecuta cuando se carga la vista, en él se va a obtener
   * la actividad docente a partir de su id y se va cargar su contenido en el objeto Calendario
   */
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
      }
    );
  }

  /**
   * método que llama al método editarActividadDocente del servicio mandándole el objeto de la clase Calendario
   */
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
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando la actividad docente";
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
