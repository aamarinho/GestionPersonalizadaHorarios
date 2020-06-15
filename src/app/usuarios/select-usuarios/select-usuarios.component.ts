import {Component, OnInit, ViewChild} from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {AsignaturaService} from '../../../services/asignatura.service';
import {take, takeUntil} from 'rxjs/operators';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-select-usuarios',
  templateUrl: './select-usuarios.component.html',
  styleUrls: ['./select-usuarios.component.css']
})
export class SelectUsuariosComponent implements OnInit {
  /**
   * los métodos y variables de esta clase están definidos en la clase multi select de asignaturas
   */
  public usuarios: Usuario[];
  icono = faUser;

  public usuariosCtrl: FormControl = new FormControl();

  public usuarioFilterCtrl: FormControl = new FormControl();

  public filteredUsuarios: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService : UsuarioService) {
    this.usuarios=new Array<Usuario>();
  }

  ngOnInit() {
    this.usuarioService.getProfesores().subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LOS IDS DE PROFESORES");
        for( let p of result){
          this.usuarios.push(p);
          console.log(p.id);
        }
        //this.seleccionada= this.asignaturas[0].id;
      },
      error=>{
        console.log(this.usuarios);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
    this.filteredUsuarios.next(this.usuarios);

    // listen for search field value changes
    this.usuarioFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {this.filterUsuarios();});
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredUsuarios.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.singleSelect.compareWith = (a: Usuario, b: Usuario) => a && b && a.email === b.email;
    });
  }

  submit(value){
    window.sessionStorage.setItem('usuario',value);
  }

  protected filterUsuarios() {
    if (!this.usuarios) {
      return;
    }
    // get the search keyword
    let search = this.usuarioFilterCtrl.value;
    if (!search) {
      this.filteredUsuarios.next(this.usuarios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUsuarios.next(
      this.usuarios.filter(usuario => (usuario.nombre+" "+usuario.apellidos).toLowerCase().indexOf(search) > -1)
    );
  }

}
