import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {UsuarioasignaturaService} from '../../../services/usuarioasignatura.service';

@Component({
  selector: 'app-estudiantes-profesor',
  templateUrl: './estudiantes-profesor.component.html',
  styleUrls: ['./estudiantes-profesor.component.css']
})
export class EstudiantesProfesorComponent implements OnInit {

  /**
   * array usado posteriormente par almacenar los estudiantes del sistema
   */
  public estudiantes : Usuario[];
  /**
   * array usado para almacenar los estudiantes que están en el array anterior
   */
  public idsestudiantes : String[];
  /**
   * icono de lupa mostrado en la vista
   */
  iconolupa = faSearch;
  /**
   * variable usada para almacenar el estudiante que se va a gestionar
   */
  public asignatura=window.sessionStorage.getItem('gestionestudiantes');

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto usuarioService,
   * el router para redireccionar a otra vista y un objeto usuarioAsignaturaService
   * @param usuarioService
   * @param router
   * @param usuarioAsignaturaService
   */
  constructor(private usuarioService: UsuarioService, private router: Router,private usuarioAsignaturaService : UsuarioasignaturaService) {
    this.estudiantes = new Array<Usuario>();
    this.idsestudiantes=new Array<String>();
  }

  /**
   * primer método que se ejecuta al cargar la vista utilizada para rellenar los arrays
   */
  ngOnInit() {
    this.estudiantes.splice(0,this.estudiantes.length);
    this.idsestudiantes.splice(0,this.idsestudiantes.length);
    this.usuarioService.getEstudiantesProfesor(window.sessionStorage.getItem('gestionestudiantes')).subscribe(
      result=>{
        for( let e of result){
          if(!this.idsestudiantes.includes(e.email)){
            this.estudiantes.push(e);
            this.idsestudiantes.push(e.email);
          }
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método usado para redireccionar a la vista para añadir un nuevo estudiante a esa asignatura
   */
  onSubmit(){
    this.router.navigate(['/seleccionarmatricula']);
  }

  /**
   * método usado para redireccionar a la vista para gestionar los grupos de un estudiante
   * @param value
   */
  registrarGrupos(value){
    window.sessionStorage.setItem('gestiongrupos',value.email);
    this.router.navigate(['/modificargrupoestudiante']);
  }

  /**
   * método usado para filtrar la tabla por cualquier campo
   */
  search_table(){
    var input, filter, table, tr, td, i,j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td") ;
      for(j=0 ; j<td.length ; j++)
      {
        let tdata = td[j] ;
        if (tdata) {
          if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break ;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }

  /**
   * método usado para desmatricular a un estudiante de una asignatura
   * @param estudiante
   */
  eliminar(estudiante) {
    if(confirm("¿Estás seguro de querer eliminar a "+estudiante.nombre+"?")) {
      this.usuarioAsignaturaService.eliminar(window.sessionStorage.getItem('gestionestudiantes'), estudiante.email).subscribe(
        result => {
          console.log(result);
          console.log("Eliminado el grupo de ese usuario correctamente");
          this.ngOnInit();
        }, error => {
          console.log(error);
          console.log("Error eliminando el grupo de ese ususario");
          this.ngOnInit();
        }
      );
    }
  }

}
