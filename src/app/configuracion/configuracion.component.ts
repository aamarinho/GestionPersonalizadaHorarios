import { Component, OnInit } from '@angular/core';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {ConfiguracionService} from '../../services/configuracion.service';
import {Configuracion} from '../../models/Configuracion';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  /**
   * objeto Configuracion que posteriormente va a ser editado
   */
  public configuracion: Configuracion;
  /**
   * icono de fecha que va a ser mostrado en el formulario
   */
  iconoFecha=faCalendarDay;
  /**
   * muestra o no la caja verde de funcionamiento correcto
   */
  mostrarbien:boolean;
  /**
   * muestra o no la caja roja de funcionamiento incorrecto
   */
  mostrarmal:boolean;
  /**
   * mensaje que va en alguna de las cajas
   */
  mensaje:string;

  /**
   * constructor que sirve para instanciar los objetos de esta clase a partir de un objeto configuracionService
   * y el router para redireccionar a otra vista
   * @param configuracionService
   * @param router
   */
  constructor(private configuracionService : ConfiguracionService, private router:Router) {
    this.configuracion = new Configuracion('','','','','');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  /**
   * primer método que se ejecuta al cargar una vista donde vamos a recoger el objeto Configuracion
   * que posteriormente va a ser editado
   */
  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.configuracionService.getConfiguracion().subscribe(
      result=>{
        this.configuracion.id=result['id'];

        let temp = result['f_inicio_uno'].split('-');
        this.configuracion.f_inicio_uno={year:parseInt(temp[0],10),month:parseInt(temp[1],10),day:parseInt(temp[2],10)};
        temp = result['f_fin_uno'].split('-');
        this.configuracion.f_fin_uno={year:parseInt(temp[0],10),month:parseInt(temp[1],10),day:parseInt(temp[2],10)};
        temp = result['f_inicio_dos'].split('-');
        this.configuracion.f_inicio_dos={year:parseInt(temp[0],10),month:parseInt(temp[1],10),day:parseInt(temp[2],10)};
        temp = result['f_fin_dos'].split('-');
        this.configuracion.f_fin_dos={year:parseInt(temp[0],10),month:parseInt(temp[1],10),day:parseInt(temp[2],10)};
      } , error=>{
        console.log(error);
      }
    );
  }

  /**
   * método que llama al servicio para editar los campos de este objeto Configuracion excepto su id
   */
  editarConfiguracion(){
    this.configuracion.f_inicio_uno=this.configuracion.f_inicio_uno['year']+'/'+this.configuracion.f_inicio_uno['month']+'/'+this.configuracion.f_inicio_uno['day'];
    this.configuracion.f_fin_uno=this.configuracion.f_fin_uno['year']+'/'+this.configuracion.f_fin_uno['month']+'/'+this.configuracion.f_fin_uno['day'];
    this.configuracion.f_inicio_dos=this.configuracion.f_inicio_dos['year']+'/'+this.configuracion.f_inicio_dos['month']+'/'+this.configuracion.f_inicio_dos['day'];
    this.configuracion.f_fin_dos=this.configuracion.f_fin_dos['year']+'/'+this.configuracion.f_fin_dos['month']+'/'+this.configuracion.f_fin_dos['day'];

    this.configuracionService.editar(this.configuracion).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editada la configuración de los cuatrimestres correctamente";
      }, error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando la configuración de los cuatrimestres";
        console.log(error);
      }
    );
  }

  /**
   * método que cierra la caja verde de correcto funcionamiento al pulsar la x
   */
  cambiarbien(){
    this.mostrarbien=false;
  }

  /**
   * método que cierra la caja roja de incorrecto funcionamiento al pulsar la x
   */
  cambiarmal(){
    this.mostrarmal=false;
  }

}
