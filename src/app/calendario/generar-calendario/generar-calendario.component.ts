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
import {CalendarioService} from '../../../services/calendario.service';
import {Calendario} from '../../../models/Calendario';


@Component({
  selector: 'app-generar-calendario',
  templateUrl: './generar-calendario.component.html',
  styleUrls: ['./generar-calendario.component.css']
})
export class GenerarCalendarioComponent implements OnInit,AfterViewInit,OnDestroy {

  public grupos : GrupoReducido[];
  public resultado : GrupoReducido[];
  public eventosGenerados : Calendario[];
  public idseventos : String[];
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


  constructor(private gruposReducidosService : GruposreducidosService, private usuarioGrupoService :UsuariogrupoService, private router: Router, private calendarioService:CalendarioService) {
    this.grupos=new Array<GrupoReducido>();
    this.resultado=new Array<GrupoReducido>();
    this.eventosGenerados=new Array<Calendario>();
    this.idseventos=new Array<String>();
  }

  ngOnInit() {
    this.eventosGenerados.splice(0,this.eventosGenerados.length);
    this.idseventos.splice(0,this.idseventos.length);
    this.grupos.splice(0,this.grupos.length);
    this.gruposMultiCtrl.reset();
    this.calendarioService.getEventosCalendario().subscribe(
      result=>{
        console.log(result);
        for(let a of result){
          this.eventosGenerados.push(a);
          if(!this.idseventos.includes(a.id_grupo)){
            this.idseventos.push(a.id_grupo);
          }
        }
      },
      error=>{
        console.log(error);
      });

    this.gruposReducidosService.getGrupos().subscribe(
      result=>{
        for(let a of result){
          if(!this.idseventos.includes(a.id)){
            this.grupos.push(a);
          }
        }
      },
      error=>{
        console.log("DIO ERROR AL OBTENER EVENTOS");
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
        this.ngOnInit();
        console.log("gestionados los grupos correctamente");
      } , error=>{
        console.log("error gestionando los grupos");
      }
    );
  }

}
