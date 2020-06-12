import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {UsuarioGrupo} from '../../../models/UsuarioGrupo';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {GruposreducidosService} from '../../../services/gruposreducidos.service';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';
import {Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-multi-select-grupos-profesor',
  templateUrl: './multi-select-grupos-profesor.component.html',
  styleUrls: ['./multi-select-grupos-profesor.component.css']
})
export class MultiSelectGruposProfesorComponent implements OnInit,AfterViewInit,OnDestroy {

  /**
   * los métodos y variables usadas en este componente son exactamente iguales que los descritos
   * en el multi select de asignaturas
   */
  public grupos : GrupoReducido[];
  public resultado : GrupoReducido[];
  public gruposAsignados : UsuarioGrupo[];
  public idsgrupos : String[];
  iconoLibro = faBook;

  public gruposMultiCtrl: FormControl = new FormControl();

  public gruposMultiFilterCtrl: FormControl = new FormControl();

  public filteredGruposMulti: ReplaySubject<GrupoReducido[]> = new ReplaySubject<GrupoReducido[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  constructor(private gruposReducidosService : GruposreducidosService, private usuarioGrupoService :UsuariogrupoService, private router: Router) {
    this.grupos=new Array<GrupoReducido>();
    this.resultado=new Array<GrupoReducido>();
    this.gruposAsignados=new Array<UsuarioGrupo>();
    this.idsgrupos=new Array<String>();
  }

  ngOnInit() {
    this.gruposAsignados.splice(0,this.gruposAsignados.length);
    this.idsgrupos.splice(0,this.idsgrupos.length);
    this.grupos.splice(0,this.grupos.length);
    this.gruposMultiCtrl.reset();
    this.usuarioGrupoService.getUsuariosGruposEstudiante(window.sessionStorage.getItem('gestionestudiantes'),window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        for(let a of result){
          this.gruposAsignados.push(a);
        }
      },
      error=>{
        console.log(error);
      });

    this.usuarioGrupoService.getUsuariosGruposProfesor(window.sessionStorage.getItem('gestionestudiantes'),window.sessionStorage.getItem('gestiongrupos')).subscribe(
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
      } , error=>{
        console.log(error);
      }
    );
  }

  registrar(){
    this.usuarioGrupoService.registrar(this.resultado,window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        this.ngOnInit();
      } , error=>{
        console.log(error);
      }
    );
  }

  volver(){
    this.router.navigate(['/estudiantesprofesor']);
  }

}
