import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faCalendarDay, faIdCard,faLaptop,faClock,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Router} from '@angular/router';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {GrupoReducido} from '../../../models/GrupoReducido';

@Component({
  selector: 'app-registro-grupo',
  templateUrl: './registro-grupo.component.html',
  styleUrls: ['./registro-grupo.component.css']
})
export class RegistroGrupoComponent implements OnInit {

  /**
   * objeto de la clase GrupoReducido que va a ser la inserción en la base de datos
   */
  public grupo: GrupoReducido;
  /**
   * array de asignaturas que va a contener todas las del sistema para seleccionar
   * a que asignatura pertenece el nuevo grupo reducido
   */
  public asignaturas : Asignatura[];
  /**
   * variable usada para coger el valor del select del array de tipos
   */
  seleccionTipo : string;
  /**
   * variable usada para coger el valor del select del array de dias
   */
  seleccionDia : string;
  /**
   * array de dias para seleccionar el día que se imparte un grupo reducido
   */
  public dias = [{ name: 'Lunes' }, { name: 'Martes' },{ name: 'Miercoles' },{ name: 'Jueves' },{ name: 'Viernes' }];
  /**
   * array para seleccionar si el grupo es teorico o practico
   */
  public tipos = [{ name: 'Practica' }, { name: 'Teorica' }];
  /**
   * icono de calendario mostrado en el formulario
   */
  iconoCalendario = faCalendarDay;
  /**
   * icono idCard mostrado en el formulario
   */
  iconoCard = faIdCard;
  /**
   * icono de ordenador mostrado en el formulario
   */
  iconoOrdenador = faLaptop;
  /**
   * icono de reloj mostrado en el formulario
   */
  iconoReloj=faClock;
  /**
   * icono de localización mostrado en el formulario
   */
  iconoSitio=faMapMarkerAlt;
  /**
   * booleano para mostrar o no la caja verde de correcto funcionamiento
   */
  public mostrarbien:boolean;
  /**
   * booleano para mostrar o no la caja roja de incorrecto funcionamiento
   */
  public mostrarmal:boolean;
  /**
   * mensaje que va en alguna de las cajas
   */
  public mensaje:string;

  /**
   * constructor para instanciar un objeto de esta clase a partir de un objeto GrupoReducidoService,
   * el router para redireccionar a otra vista y un objeto AsignaturaService
   * @param grupoService
   * @param router
   * @param asignaturaService
   */
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

  /**
   * primer método que se ejecuta al cargar la vista, utilizado para obtener todas las asignaturas
   * del sistema para seleccionar a cual pertenece el grupo reducido
   */
  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.asignaturaService.getAsignaturas().subscribe(
      result=>{
        for( let a of result){
          this.asignaturas.push(a);
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que llama al servicio para registrar el nuevo grupo reducido
   */
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
        this.grupo.hora_inicio={hour:9,minute:0};
        this.grupo.hora_fin={hour:9,minute:0};
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
