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
        this.configuracion.f_inicio_uno=result['f_inicio_uno'];
        this.configuracion.f_fin_uno=result['f_fin_uno'];
        this.configuracion.f_inicio_dos=result['f_inicio_dos'];
        this.configuracion.f_fin_dos=result['f_fin_dos'];
      } , error=>{
        console.log(error);
        console.log("error obteniendo al usuario");
      }
    );
  }

  editarPerfil(){
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
