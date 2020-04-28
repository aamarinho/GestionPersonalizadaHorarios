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

  public usuarios: Usuario[];
  icono = faUser;
  public asignatura=window.sessionStorage.getItem('gestionestudiantes');
  public usuariosRegistrados:Usuario[];
  public idsUsuarios:String[];

  /** control for the selected asignatura */
  public asignaturaCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public AsignaturaFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredAsignaturas: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService : UsuarioService, private router:Router, private usuarioAsignaturaService: UsuarioasignaturaService) {
    this.usuarios=new Array<Usuario>();
    this.usuariosRegistrados=new Array<Usuario>();
    this.idsUsuarios=new Array<String>();
  }

  ngOnInit() {
    this.usuarioService.getEstudiantesProfesor(window.sessionStorage.getItem('gestionestudiantes')).subscribe(
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
      });

    this.usuarioService.getEstudiantes().subscribe(
      result=>{
        console.log(result);
        for( let p of result){
          if(!this.idsUsuarios.includes(p.email)){
            if(!this.usuariosRegistrados.includes(p)){
              this.usuarios.push(p);
            }
          }
        }
      },
      error=>{
        console.log(error);
        console.log("DIO ERROR AL OBTENER LOS USUARIOS TODOS");
      });
    // set initial selection
    //this.bankCtrl.setValue(this.asignaturas[10]);

    // load the initial bank list
    this.filteredAsignaturas.next(this.usuarios);

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
      this.singleSelect.compareWith = (a: Usuario, b: Usuario) => a && b && a.email === b.email;
    });
  }

  submit(value){
    this.usuarioAsignaturaService.registrarUsuarioAsignatura(window.sessionStorage.getItem('gestionestudiantes'),value).subscribe(
      result=>{
        console.log("registro sin errores");
      } , error=>{
        console.log("error registrando al usuario");
      }
    );
  }

  protected filterAsignaturas() {
    if (!this.usuarios) {
      return;
    }
    // get the search keyword
    let search = this.AsignaturaFilterCtrl.value;
    if (!search) {
      this.filteredAsignaturas.next(this.usuarios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredAsignaturas.next(
      this.usuarios.filter(usuario => (usuario.nombre+" "+usuario.apellidos).toLowerCase().indexOf(search) > -1)
    );
  }


}
