import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {UsuarioasignaturaService} from '../../../services/usuarioasignatura.service';

@Component({
  selector: 'app-select-matricula-estudiante',
  templateUrl: './select-matricula-estudiante.component.html',
  styleUrls: ['./select-matricula-estudiante.component.css']
})
export class SelectMatriculaEstudianteComponent implements OnInit,AfterViewInit,OnDestroy {
  /**
   * los métodos y variables de esta clase están definidos en la clase multi select de asignaturas
   */
  public usuarios: Usuario[];
  icono = faUser;
  public asignatura=window.sessionStorage.getItem('gestionestudiantes');
  public usuariosRegistrados:Usuario[];
  public idsUsuarios:String[];

  public estudiantesCtrl: FormControl = new FormControl();

  public estudianteFilterCtrl: FormControl = new FormControl();

  public filteredEstudiantes: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService : UsuarioService, private router:Router, private usuarioAsignaturaService: UsuarioasignaturaService) {
    this.usuarios=new Array<Usuario>();
    this.usuariosRegistrados=new Array<Usuario>();
    this.idsUsuarios=new Array<String>();
  }

  ngOnInit() {
    /*this.usuarioService.getEstudiantesProfesor(window.sessionStorage.getItem('gestionestudiantes')).subscribe(
      result=>{
        console.log(result);
        for( let p of result){
          this.usuariosRegistrados.push(p);
          this.idsUsuarios.push(p.email);
        }
        console.log(this.idsUsuarios);
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LOS USUARIOS TODOS");
      });*/

    this.usuarioService.getEstudiantesParaMatricular(window.sessionStorage.getItem('gestionestudiantes')).subscribe(
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

  darDeAlta(value){
    this.usuarioAsignaturaService.registrarUsuarioAsignatura(window.sessionStorage.getItem('gestionestudiantes'),value).subscribe(
      result=>{
        console.log("registro sin errores");
      } , error=>{
        console.log(error);
        console.log("error registrando al usuario");
      }
    );
    this.router.navigate(['/estudiantesprofesor']);
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

  volver(){
    this.router.navigate(['/estudiantesprofesor']);
  }


}
