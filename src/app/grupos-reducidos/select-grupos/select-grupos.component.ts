import {Component, OnInit, ViewChild} from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {AsignaturaService} from '../../../services/asignatura.service';
import {take, takeUntil} from 'rxjs/operators';
import {GrupoReducido} from '../../../models/GrupoReducido';
import {UsuarioGrupo} from '../../../models/UsuarioGrupo';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';

@Component({
  selector: 'app-select-grupos',
  templateUrl: './select-grupos.component.html',
  styleUrls: ['./select-grupos.component.css']
})
export class SelectGruposComponent implements OnInit {

  public grupos: UsuarioGrupo[];
  icono = faUser;

  /** control for the selected asignatura */
  public asignaturaCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public AsignaturaFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredAsignaturas: ReplaySubject<UsuarioGrupo[]> = new ReplaySubject<UsuarioGrupo[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private usuarioGrupoService : UsuariogrupoService) {
    this.grupos=new Array<UsuarioGrupo>();
  }

  ngOnInit() {
    this.usuarioGrupoService.getUsuariosGrupos(window.sessionStorage.getItem('email')).subscribe(
      result=>{
        for( let a of result){
          this.grupos.push(a);
          console.log(a.id);
        }
        //this.seleccionada= this.asignaturas[0].id;
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LOS GRUPOS QUE EL TIENE");
      });
    // set initial selection
    //this.bankCtrl.setValue(this.asignaturas[10]);

    // load the initial bank list
    this.filteredAsignaturas.next(this.grupos);

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
      this.singleSelect.compareWith = (a: UsuarioGrupo, b: UsuarioGrupo) => a && b && a.id === b.id;
    });
  }

  submit(value){
    window.sessionStorage.setItem('grupo',value);
  }

  protected filterAsignaturas() {
    if (!this.grupos) {
      return;
    }
    // get the search keyword
    let search = this.AsignaturaFilterCtrl.value;
    if (!search) {
      this.filteredAsignaturas.next(this.grupos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredAsignaturas.next(
      this.grupos.filter(grupo => grupo.id.toLowerCase().indexOf(search) > -1)
    );
  }
}
