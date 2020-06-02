import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {AsignaturaService} from '../../../services/asignatura.service';
import {take, takeUntil} from 'rxjs/operators';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-todos-usuarios',
  templateUrl: './select-todos-usuarios.component.html',
  styleUrls: ['./select-todos-usuarios.component.css']
})
export class SelectTodosUsuariosComponent implements OnInit,OnDestroy,AfterViewInit {

  public usuarios: Usuario[];
  icono = faUser;

  public usuarioCtrl: FormControl = new FormControl();

  public UsuarioFilterCtrl: FormControl = new FormControl();

  public filteredUsuarios: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService : UsuarioService, private router:Router) {
    this.usuarios=new Array<Usuario>();
  }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      result=>{
        console.log(result);
        for( let p of result){
          this.usuarios.push(p);
        }
        //this.seleccionada= this.asignaturas[0].id;
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LOS USUARIOS TODOS");
      });
    this.filteredUsuarios.next(this.usuarios);

    // listen for search field value changes
    this.UsuarioFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {this.filterUsuarios();});
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
    window.sessionStorage.setItem('calendariousuario',value);
    this.router.navigate(['/calendario']);
  }

  protected filterUsuarios() {
    if (!this.usuarios) {
      return;
    }
    // get the search keyword
    let search = this.UsuarioFilterCtrl.value;
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
