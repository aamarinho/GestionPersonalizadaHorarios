import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asignaturas-profesor',
  templateUrl: './asignaturas-profesor.component.html',
  styleUrls: ['./asignaturas-profesor.component.css']
})
export class AsignaturasProfesorComponent implements OnInit {

  /**
   * array de asignaturas posteriormente rellenado con las asignaturas de un profesor
   */
  public asignaturas : Asignatura[];
  /**
   * icono de lupa mostrado en el formulario
   */
  iconolupa = faSearch;

  /**
   * constructor que instancia objetos de la clase pasándole un objeto AsignaturaService y el router para
   * redireccionar a otra vista
   * @param asignaturaService
   * @param router
   */
  constructor(private asignaturaService: AsignaturaService, private router: Router) {
    this.asignaturas = new Array<Asignatura>();
  }

  /**
   * primer método que se ejecuta al cargar la vista donde vamos a rellenar el array
   * de asignaturas con las asignaturas de ese profesor a partir de su email
   */
  ngOnInit() {
    this.asignaturas.splice(0,this.asignaturas.length);
    this.asignaturaService.getAsignaturasProfesor(window.sessionStorage.getItem('email')).subscribe(
      result=>{
        for( let a of result){
          a.email=window.sessionStorage.getItem('email');
          this.asignaturas.push(a);
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que sirve para buscar por cualquier campo en la tabla de asignaturas
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
   * método que redirecciona a la vista para ver los estudiantes de una asignatura de un profesor
   * almacenando en el sessionStorage la abreviatura de la asignatura
   * @param asignatura
   */
  gestionarEstudiantes(asignatura: Asignatura) {
    window.sessionStorage.setItem('gestionestudiantes',asignatura.id);
    this.router.navigate(['/estudiantesprofesor']);
  }
}
