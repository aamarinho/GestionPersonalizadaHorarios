import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';
import {Asignatura} from '../../../models/Asignatura';
import {AsignaturaService} from '../../../services/asignatura.service';
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-asignaturas',
  templateUrl: './select-asignaturas.component.html',
  styleUrls: ['./select-asignaturas.component.css']
})
export class SelectAsignaturasComponent implements OnInit, AfterViewInit, OnDestroy {

  public asignaturas: Asignatura[];
  icono = faUser;

  /** control for the selected asignatura */
  public asignaturaCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public AsignaturaFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredAsignaturas: ReplaySubject<Asignatura[]> = new ReplaySubject<Asignatura[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private asignaturaService : AsignaturaService) {
    this.asignaturas=new Array<Asignatura>();
  }

  ngOnInit() {
    this.asignaturaService.getAsignaturas().subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LOS IDS DE ASIGNATURA");
        for( let a of result){
          this.asignaturas.push(a);
          console.log(a.id);
        }
        //this.seleccionada= this.asignaturas[0].id;
      },
      error=>{
        console.log(this.asignaturas);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
    // set initial selection
    //this.bankCtrl.setValue(this.asignaturas[10]);

    // load the initial bank list
    this.filteredAsignaturas.next(this.asignaturas);

    // listen for search field value changes
    this.AsignaturaFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {this.filterAsignaturas();});
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
    this.filteredAsignaturas.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Asignatura, b: Asignatura) => a && b && a.id === b.id;
      });
  }

  submit(value){
    window.sessionStorage.setItem('asignatura',value);
  }

  protected filterAsignaturas() {
    if (!this.asignaturas) {
      return;
    }
    // get the search keyword
    let search = this.AsignaturaFilterCtrl.value;
    if (!search) {
      this.filteredAsignaturas.next(this.asignaturas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredAsignaturas.next(
      this.asignaturas.filter(asignatura => (asignatura.id+" "+asignatura.nombre).toLowerCase().indexOf(search) > -1)
    );
  }

}
