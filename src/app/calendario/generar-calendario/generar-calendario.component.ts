import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';
import {CalendarioService} from '../../../services/calendario.service';
import {Calendario} from '../../../models/Calendario';


@Component({
  selector: 'app-generar-calendario',
  templateUrl: './generar-calendario.component.html',
  styleUrls: ['./generar-calendario.component.css']
})
export class GenerarCalendarioComponent implements OnInit,AfterViewInit,OnDestroy {
  /**
   * todas las variables y métodos son los mismos que los definidos en el componente multi select de asignaturas
   */
  public grupos : GrupoReducido[];
  public resultado : GrupoReducido[];
  public eventosGenerados : Calendario[];
  public idseventos : String[];
  iconoLibro = faBook;
  public mostrarbien:boolean;
  public mostrarmal:boolean;
  public mensaje:string;

  public gruposMultiCtrl: FormControl = new FormControl();

  public gruposMultiFilterCtrl: FormControl = new FormControl();

  public filteredGruposMulti: ReplaySubject<GrupoReducido[]> = new ReplaySubject<GrupoReducido[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private gruposReducidosService : GruposreducidosService, private usuarioGrupoService :UsuariogrupoService, private router: Router, private calendarioService:CalendarioService) {
    this.grupos=new Array<GrupoReducido>();
    this.resultado=new Array<GrupoReducido>();
    this.eventosGenerados=new Array<Calendario>();
    this.idseventos=new Array<String>();
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
  }

  ngOnInit() {
    this.mostrarbien=false;
    this.mostrarmal=false;
    this.mensaje='';
    this.eventosGenerados.splice(0,this.eventosGenerados.length);
    this.idseventos.splice(0,this.idseventos.length);
    this.grupos.splice(0,this.grupos.length);
    this.gruposMultiCtrl.reset();
    this.calendarioService.getGruposSinGenerar().subscribe(
      result=>{
        for(let a of result){
          this.grupos.push(a);
        }
      },
      error=>{
        console.log(error);
      });

    this.filteredGruposMulti.next(this.grupos);

    this.gruposMultiFilterCtrl.valueChanges
      .pipe()
      .subscribe(() => {
        this.filterBanksMulti();
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

  protected filterBanksMulti() {
    if (!this.grupos) {
      return;
    }
    let search = this.gruposMultiFilterCtrl.value;
    if (!search) {
      this.filteredGruposMulti.next(this.grupos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredGruposMulti.next(
      this.grupos.filter(grupo => (grupo.id+" "+grupo.tipo).toLowerCase().indexOf(search) > -1)
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

  registrar(){
    this.calendarioService.registrar(this.resultado).subscribe(
      result=>{
        this.mostrarmal=false;
        this.mostrarbien=true;
        this.mensaje="Generado el calendario para ese/s grupo/s correctamente";
      } , error=>{
        this.mostrarbien=false;
        this.mostrarmal=true;
        this.mensaje="Ocurrió un error generando el calendario para ese/s grupo/s";
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
