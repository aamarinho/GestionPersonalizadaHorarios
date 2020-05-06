import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {Asignatura} from '../../../models/Asignatura';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';
import {AsignaturaService} from '../../../services/asignatura.service';
import {element} from 'protractor';
import {UsuarioasignaturaService} from '../../../services/usuarioasignatura.service';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {UsuarioAsignatura} from '../../../models/UsuarioAsignatura';
import {Router} from '@angular/router';

@Component({
  selector: 'app-multi-select-asignaturas',
  templateUrl: './multi-select-asignaturas.component.html',
  styleUrls: ['./multi-select-asignaturas.component.css']
})
export class MultiSelectAsignaturasComponent implements OnInit,AfterViewInit, OnDestroy {

  public asignaturas : Asignatura[];
  public resultado : Asignatura[];
  public asignaturasAsignadas : UsuarioAsignatura[];
  public a : UsuarioAsignatura;
  iconoLibro = faBook;

  /** control for the selected bank for multi-selection */
  public asignaturasMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public asignaturasMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredAsignaturasMulti: ReplaySubject<Asignatura[]> = new ReplaySubject<Asignatura[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private asignaturaService : AsignaturaService, private usuarioAsignaturaService:UsuarioasignaturaService, private router: Router) {
    this.asignaturas=new Array<Asignatura>();
    this.resultado=new Array<Asignatura>();
    this.asignaturasAsignadas=new Array<UsuarioAsignatura>();
    this.a=new UsuarioAsignatura('','');
  }

  ngOnInit() {
    this.asignaturasAsignadas.splice(0,this.asignaturasAsignadas.length);
    this.asignaturas.splice(0,this.asignaturas.length);
    this.asignaturasMultiCtrl.reset();
    this.usuarioAsignaturaService.getUsuariosAsignaturas(window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        console.log(result);
        for( let a of result){
          this.asignaturasAsignadas.push(a);
        }
      },
      error=>{
        console.log(error);
        console.log("ERROR OBTENIENDO LAS ASIGNATURAS ASIGNADAS A UN USUARIO");
      });

    this.usuarioAsignaturaService.getUsuariosAsignaturasSinAsignadas(window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LOS IDS DE ASIGNATURA");
        for( let a of result){
            this.asignaturas.push(a);
        }
      },
      error=>{
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });


    this.filteredAsignaturasMulti.next(this.asignaturas);

    //this.bankMultiCtrl.setValue(this.asignaturas);
    // listen for search field value changes
    this.asignaturasMultiFilterCtrl.valueChanges
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
    this.filteredAsignaturasMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Asignatura, b: Asignatura) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti() {
    if (!this.asignaturas) {
      return;
    }
    // get the search keyword
    let search = this.asignaturasMultiFilterCtrl.value;
    if (!search) {
      this.filteredAsignaturasMulti.next(this.asignaturas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredAsignaturasMulti.next(
      this.asignaturas.filter(asignatura => (asignatura.id+" "+asignatura.nombre+" "+asignatura.curso).toLowerCase().indexOf(search) > -1)
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
    this.usuarioAsignaturaService.eliminar(value,window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        this.ngOnInit();
      } , error=>{
        console.log(error);
      }
    );
  }

  registrar(){
    this.usuarioAsignaturaService.registrar(this.resultado,window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        this.ngOnInit();
      } , error=>{
        console.log(error);
      }
    );
  }

}
