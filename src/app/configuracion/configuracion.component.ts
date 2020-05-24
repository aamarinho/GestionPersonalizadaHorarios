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

  public configuracion: Configuracion;
  iconoFecha=faCalendarDay;
  mostrarbien:boolean;
  mostrarmal:boolean;
  mensaje:string;

  constructor(private configuracionService : ConfiguracionService, private router:Router) {
    this.configuracion = new Configuracion('','','','','');
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

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

  editarConfiguracion(){
    this.configuracion.f_inicio_uno=this.configuracion.f_inicio_uno['year']+'/'+this.configuracion.f_inicio_uno['month']+'/'+this.configuracion.f_inicio_uno['day'];
    this.configuracion.f_fin_uno=this.configuracion.f_fin_uno['year']+'/'+this.configuracion.f_fin_uno['month']+'/'+this.configuracion.f_fin_uno['day'];
    this.configuracion.f_inicio_dos=this.configuracion.f_inicio_dos['year']+'/'+this.configuracion.f_inicio_dos['month']+'/'+this.configuracion.f_inicio_dos['day'];
    this.configuracion.f_fin_dos=this.configuracion.f_fin_dos['year']+'/'+this.configuracion.f_fin_dos['month']+'/'+this.configuracion.f_fin_dos['day'];

    console.log(this.configuracion);
    this.configuracionService.editar(this.configuracion).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Editada la configuración de los cuatrimestres correctamente";
        //this.router.navigate(['/calendario']);
      }, error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error editando la configuración de los cuatrimestres";
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
