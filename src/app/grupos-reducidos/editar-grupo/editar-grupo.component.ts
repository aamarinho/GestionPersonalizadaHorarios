import { Component, OnInit } from '@angular/core';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {Asignatura} from '../../../models/Asignatura';
import {faCalendarDay, faClock, faIdCard, faLaptop, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {Router} from '@angular/router';
import {AsignaturaService} from '../../../services/asignatura.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent implements OnInit {

  /**
   * objeto de la clase GrupoReducido que va a almacenar el grupo reducido que se va a editar
   */
  public grupo: GrupoReducido;
  /**
   * array de asignaturas que va a contener todas las del sistema para seleccionar
   * a que asignatura pertenece el grupo reducido
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
   * variable usada para almacenar el nombre de la asignatura ya asignada al grupo reducido
   */
  public nombreasig : string;
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
   * constructor para instanciar un objeto de esta clase a partir de un objeto grupoReducidoService,
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
  }

  /**
   * primer método que se ejecuta al cargar la vista, utilizado para almacenar en el array
   * de asignaturas todas las del sistema y para almacenar en la variable grupo los atributos
   * que van a ser editados, excepto su id
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
        let temp = this.grupo.hora_inicio.split(':');
        this.grupo.hora_inicio={hour:parseInt(temp[0],10),minute:parseInt(temp[1],10)};
        this.grupo.hora_fin=result['hora_fin'];
        temp = this.grupo.hora_fin.split(':');
        this.grupo.hora_fin={hour:parseInt(temp[0],10),minute:parseInt(temp[1],10)};

        this.grupo.aula=result['aula'];
        this.nombreasig=result['nombre'];
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que va a llamar al servicio para editar los atributos de ese grupo reducido
   */
  editarGrupo(){
    this.grupo.hora_inicio=this.grupo.hora_inicio['hour']+':'+this.grupo.hora_inicio['minute']+':'+this.grupo.hora_inicio['second'];
    this.grupo.hora_fin=this.grupo.hora_fin['hour']+':'+this.grupo.hora_fin['minute']+':'+this.grupo.hora_fin['second'];
    this.grupo.id_asignatura=window.sessionStorage.getItem('asignatura');
    this.grupo.tipo=this.seleccionTipo;
    this.grupo.dia=this.seleccionDia;
    this.grupoService.editar(this.grupo).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editado el grupo reducido correctamente";
      }, error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando el grupo reducido";
        console.log(error);
      }
    );
  }

  /**
   * método usado para cerrar la caja verde de correcto funcionamiento
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método usado para cerrar la caja roja de incorrecto funcionamiento
   */
  cambiarmal(){
    this.mostrarmal=false;
  }
}
