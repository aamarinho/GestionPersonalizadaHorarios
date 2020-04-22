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
  selector: 'app-generar-calendario',
  templateUrl: './generar-calendario.component.html',
  styleUrls: ['./generar-calendario.component.css']
})
export class GenerarCalendarioComponent implements OnInit,AfterViewInit,OnDestroy {

  public grupos : GrupoReducido[];
  public resultado : GrupoReducido[];
  public gruposAsignados : UsuarioGrupo[];
  public idsgrupos : String[];
  iconoLibro = faBook;

  /** control for the selected bank for multi-selection */
  public gruposMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public gruposMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredGruposMulti: ReplaySubject<GrupoReducido[]> = new ReplaySubject<GrupoReducido[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
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
    this.usuarioGrupoService.getUsuariosGrupos(window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        console.log(result);
        for(let a of result){
          this.gruposAsignados.push(a);
          this.idsgrupos.push(a.id);
        }
      },
      error=>{
        console.log(error);
        console.log("ERROR OBTENIENDO LAS ASIGNATURAS ASIGNADAS A UN USUARIO");
      });

    this.gruposReducidosService.getGrupos().subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LOS IDS DE GRUPO");
        console.log("array de ids grupos---->");
        console.log(this.idsgrupos);
        for(let a of result){
          if(!this.idsgrupos.includes(a.id)){
            console.log(a.id);
            this.grupos.push(a);
          }
        }
        console.log(this.grupos);
        console.log(this.idsgrupos);
      },
      error=>{
        console.log("DIO ERROR AL OBTENER LOS GRUPOS");
      });


    this.filteredGruposMulti.next(this.grupos);

    //this.bankMultiCtrl.setValue(this.asignaturas);
    // listen for search field value changes
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

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredGruposMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: GrupoReducido, b: GrupoReducido) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti() {
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
    // filter the banks
    this.filteredGruposMulti.next(
      this.grupos.filter(grupo => (grupo.id+" "+grupo.tipo+" "+grupo.id_asignatura).toLowerCase().indexOf(search) > -1)
    );
  }

  onSubmit(value){
    if(!this.resultado.includes(value.id)){
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
    console.log(this.resultado);
    /*this.usuarioGrupoService.registrar(this.resultado,window.sessionStorage.getItem('gestiongrupos')).subscribe(
      result=>{
        this.ngOnInit();
        console.log("gestionados los grupos correctamente");
      } , error=>{
        console.log("error gestionando los grupos");
      }
    );*/
  }

}
