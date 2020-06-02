import {Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-select-estudiantes',
  templateUrl: './select-estudiantes.component.html',
  styleUrls: ['./select-estudiantes.component.css']
})
export class SelectEstudiantesComponent implements OnInit {

  public usuarios: Usuario[];
  icono = faUser;

  public estudiantesCtrl: FormControl = new FormControl();

  public estudianteFilterCtrl: FormControl = new FormControl();

  public filteredEstudiantes: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService : UsuarioService, private router:Router) {
    this.usuarios=new Array<Usuario>();
  }

  ngOnInit() {
    this.usuarioService.getEstudiantesProfesorByEmail(window.sessionStorage.getItem('email')).subscribe(
      result=>{
        console.log(result);
        for( let p of result){
          this.usuarios.push(p);
        }
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LOS USUARIOS TODOS");
      });
    this.filteredEstudiantes.next(this.usuarios);

    // listen for search field value changes
    this.estudianteFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {this.filterEstudiantes();});
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredEstudiantes.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.singleSelect.compareWith = (a: Usuario, b: Usuario) => a && b && a.email === b.email;
    });
  }

  verCalendario(value){ //VER AQUI
    window.sessionStorage.setItem('calendariousuario',value);
    this.router.navigate(['/calendario']);
  }

  protected filterEstudiantes() {
    if (!this.usuarios) {
      return;
    }
    // get the search keyword
    let search = this.estudianteFilterCtrl.value;
    if (!search) {
      this.filteredEstudiantes.next(this.usuarios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredEstudiantes.next(
      this.usuarios.filter(usuario => (usuario.nombre+" "+usuario.apellidos).toLowerCase().indexOf(search) > -1)
    );
  }


}
