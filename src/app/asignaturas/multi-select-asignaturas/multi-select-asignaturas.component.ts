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

  /**
   * array de asignaturas para seleccionar
   */
  public asignaturas : Asignatura[];
  /**
   * resultado final de las asignaturas seleccionadas
   */
  public resultado : Asignatura[];
  /**
   * array de asignaturas ya asignadas a ese usuario
   */
  public asignaturasAsignadas : UsuarioAsignatura[];
  /**
   * icono de libro mostrado en la vista
   */
  iconoLibro = faBook;
  /**
   * control para la asignatura seleccionada para la multiseleccion
   */
  public asignaturasMultiCtrl: FormControl = new FormControl();
  /**
   * control para el filtro del MatSelect cuando se teclea
   */
  public asignaturasMultiFilterCtrl: FormControl = new FormControl();
  /**
   * asignaturas filtradas por lo que se introdujo por teclado
   */
  public filteredAsignaturasMulti: ReplaySubject<Asignatura[]> = new ReplaySubject<Asignatura[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /**
   * notifica cuando el componente fue destruido
   */
  protected _onDestroy = new Subject<void>();

  /**
   * constructor para instanciar objetos de esta clase a partir de objetos AsignaturaService, UsuarioAsignaturaService
   * y el router para redireccionar a otra vista
   * @param asignaturaService
   * @param usuarioAsignaturaService
   * @param router
   */
  constructor(private asignaturaService : AsignaturaService, private usuarioAsignaturaService:UsuarioasignaturaService, private router: Router) {
    this.asignaturas=new Array<Asignatura>();
    this.resultado=new Array<Asignatura>();
    this.asignaturasAsignadas=new Array<UsuarioAsignatura>();
  }

  /**
   * primer método que se ejecuta al cargar la vista para obtener las asignaturas ya asignadas a ese usuario
   * y las no asignadas
   */
  ngOnInit() {
    this.asignaturasAsignadas.splice(0,this.asignaturasAsignadas.length);
    this.asignaturas.splice(0,this.asignaturas.length);
    this.asignaturasMultiCtrl.reset();
    this.usuarioAsignaturaService.getUsuariosAsignaturas(window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        for( let a of result){
          this.asignaturasAsignadas.push(a);
        }
      },
      error=>{
        console.log(error);
      });

    this.usuarioAsignaturaService.getUsuariosAsignaturasSinAsignadas(window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        for( let a of result){
            this.asignaturas.push(a);
        }
      },
      error=>{
        console.log(error);
      });

    this.filteredAsignaturasMulti.next(this.asignaturas);

    this.asignaturasMultiFilterCtrl.valueChanges
      .pipe()
      .subscribe(() => {
        this.filterAsignaturasMulti();
      });
  }

  /**
   * método que se ejecuta cuando se ha cargado ya toda la vista
   */
  ngAfterViewInit() {
    this.setInitialValue();
  }

  /**
   * método que se ejecuta cuando se destruye un elemento
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * pone el valor inicial después de que el filtro de asignaturas es cargado
   */
  protected setInitialValue() {
    this.filteredAsignaturasMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: Asignatura, b: Asignatura) => a && b && a.id === b.id;
      });
  }

  /**
   * filtra las asignaturas por id nombre y curso
   */
  protected filterAsignaturasMulti() {
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
    this.filteredAsignaturasMulti.next(
      this.asignaturas.filter(asignatura => (asignatura.id+" "+asignatura.nombre+" "+asignatura.curso).toLowerCase().indexOf(search) > -1)
    );
  }

  /**
   * introduce o elimina un valor cuando se pulsa en el select
   * @param value
   */
  onSubmit(value){
    if(!this.resultado.includes(value)){
      this.resultado.push(value);
    } else{
      this.removeItemFromArr(this.resultado,value);
    }
    console.log(this.resultado);
  }

  /**
   * elimina una asignatura del array
   * @param arr
   * @param item
   */
  removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
  }

  /**
   * llama al servicio para eliminar a un usuario de una asignatura
   * @param value
   */
  eliminar(value){
    this.usuarioAsignaturaService.eliminar(value,window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        this.ngOnInit();
      } , error=>{
        console.log(error);
      }
    );
  }

  /**
   * llama al servicio para registrar a un usuario en una asignatura
   */
  registrar(){
    this.usuarioAsignaturaService.registrar(this.resultado,window.sessionStorage.getItem('gestionasignaturas')).subscribe(
      result=>{
        this.ngOnInit();
      } , error=>{
        console.log(error);
      }
    );
  }

  /**
   * método que redirecciona a la vista dependiendo de que tipo de usuario se esté editando
   */
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
