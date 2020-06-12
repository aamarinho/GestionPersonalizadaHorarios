import {Component, OnInit, ViewChild} from '@angular/core';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';
import {UsuarioGrupo} from '../../../models/UsuarioGrupo';
import {UsuariogrupoService} from '../../../services/usuariogrupo.service';

@Component({
  selector: 'app-select-grupos',
  templateUrl: './select-grupos.component.html',
  styleUrls: ['./select-grupos.component.css']
})
export class SelectGruposComponent implements OnInit {

  /**
   * todos los métodos y variables usados en esta clase son exactamente iguales que los descritos
   * en el multi select de asignaturas
   */
  public grupos: UsuarioGrupo[];
  icono = faUsers;

  public grupoCtrl: FormControl = new FormControl();

  public grupoFilterCtrl: FormControl = new FormControl();

  public filteredGrupos: ReplaySubject<UsuarioGrupo[]> = new ReplaySubject<UsuarioGrupo[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private usuarioGrupoService : UsuariogrupoService) {
    this.grupos=new Array<UsuarioGrupo>();
  }

  ngOnInit() {
    this.usuarioGrupoService.getUsuariosGrupos(window.sessionStorage.getItem('email')).subscribe(
      result=>{
        for( let a of result){
          this.grupos.push(a);
        }
      },
      error=>{
        console.log(error);
      });
    this.filteredGrupos.next(this.grupos);

    this.grupoFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {this.filterGrupos();});
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredGrupos.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.singleSelect.compareWith = (a: UsuarioGrupo, b: UsuarioGrupo) => a && b && a.id === b.id;
    });
  }

  submit(value){
    window.sessionStorage.setItem('grupo',value);
  }

  protected filterGrupos() {
    if (!this.grupos) {
      return;
    }
    let search = this.grupoFilterCtrl.value;
    if (!search) {
      this.filteredGrupos.next(this.grupos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredGrupos.next(
      this.grupos.filter(grupo => grupo.id.toLowerCase().indexOf(search) > -1)
    );
  }
}
