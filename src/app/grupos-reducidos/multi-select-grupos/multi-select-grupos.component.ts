import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {UsuarioGrupo} from '../../../models/UsuarioGrupo';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';

@Component({
  selector: 'app-multi-select-grupos',
  templateUrl: './multi-select-grupos.component.html',
  styleUrls: ['./multi-select-grupos.component.css']
})
export class MultiSelectGruposComponent implements OnInit,AfterViewInit, OnDestroy {


  public grupos : GrupoReducido[];
  public resultado : GrupoReducido[];
  public gruposAsignados : UsuarioGrupo[];
  public mensaje:string;
  iconoLibro = faBook;
  public mostrarmal:boolean;
  public mensajeerror:string;

  public gruposMultiCtrl: FormControl = new FormControl();

  public gruposMultiFilterCtrl: FormControl = new FormControl();

  public filteredGruposMulti: ReplaySubject<GrupoReducido[]> = new ReplaySubject<GrupoReducido[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private gruposReducidosService : GruposreducidosService, private usuarioGrupoService :UsuariogrupoService, private router: Router) {
    this.grupos=new Array<GrupoReducido>();
    this.resultado=new Array<GrupoReducido>();
    this.gruposAsignados=new Array<UsuarioGrupo>();
    this.mensaje='';
    this.mostrarmal=false;
    this.mensajeerror='';
  }

  ngOnInit() {
    this.mostrarmal=false;
    this.mensajeerror='';
    this.gruposAsignados.splice(0,this.gruposAsignados.length);
    this.grupos.splice(0,this.grupos.length);
    this.gruposMultiCtrl.reset();
    this.usuarioGrupoService.getUsuariosGrupos(window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        console.log(result);
        for(let a of result){
          this.gruposAsignados.push(a);
        }
        console.log(this.gruposAsignados);
      },
      error=>{
        console.log(error);
        console.log("ERROR OBTENIENDO LAS ASIGNATURAS ASIGNADAS A UN USUARIO");
      });

    this.usuarioGrupoService.getUsuariosGruposSinAsignados(window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LOS IDS DE GRUPO");
        console.log("array de ids grupos---->");
        for(let a of result){
            this.grupos.push(a);
        }
        if(this.grupos.length==0){
          this.mensaje="No hay grupos para seleccionar";
        } else if(this.grupos.length!=0){
          this.mensaje="";
        }
      },
      error=>{
        console.log("DIO ERROR AL OBTENER LOS GRUPOS");
      });


    this.filteredGruposMulti.next(this.grupos);

    // listen for search field value changes
    this.gruposMultiFilterCtrl.valueChanges
      .pipe()
      .subscribe(() => {
        this.filterGruposMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredGruposMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: GrupoReducido, b: GrupoReducido) => a && b && a.id === b.id;
      });
  }

  protected filterGruposMulti() {
    if (!this.grupos) {
      return;
    }
    // get the search keyword
    let search = this.gruposMultiFilterCtrl.value;
    if (!search) {
      this.filteredGruposMulti.next(this.grupos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredGruposMulti.next(
    this.grupos.filter(grupo => (grupo.id+" "+grupo.tipo+" "+grupo.id_asignatura).toLowerCase().indexOf(search) > -1)
    );
  }

  onSubmit(value){
    if(!this.resultado.includes(value)){
      this.resultado.push(value);
    } else{
      this.removeItemFromArr(this.resultado,value);
    }
    console.log(this.resultado);
  }

  removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
  }

  eliminar(value){
    this.usuarioGrupoService.eliminar(value,window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        this.ngOnInit();
        console.log(result);
        console.log("Eliminado el grupo de ese usuario correctamente");
      } , error=>{
        console.log(error);
        console.log("Error eliminando el grupo de ese ususario");
      }
    );
  }

  cambiarmal(){
    this.mostrarmal=false;
  }

  registrar(){
    this.usuarioGrupoService.registrar(this.resultado,window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        this.ngOnInit();
        console.log("gestionados los grupos correctamente");
      } , error=>{
        this.mostrarmal=true;
        this.mensajeerror="Error añadiendo el/los grupo/s reducido/s";
        console.log("error gestionando los grupos");
      }
    );
  }

  volver(){
    if(window.sessionStorage.getItem('tipousuario')=='3'){
      this.router.navigate(['/estudiantes']);
    } else if(window.sessionStorage.getItem('tipousuario')=='2'){
      this.router.navigate(['/profesores']);
    } else{
      this.router.navigate(['/usuarios']);
    }
  }

}
