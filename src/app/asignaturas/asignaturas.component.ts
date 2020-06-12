import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Asignatura} from '../../models/Asignatura';
import {AsignaturaService} from '../../services/asignatura.service';
import{faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  /**
   * array de asignaturas que va a ser rellenado con todas las registradas en el sistema
   */
  public asignaturas : Asignatura[];
  /**
   * icono de lupa mostrado en la vista para buscar
   */
  iconolupa = faSearch;

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto AsignaturaService y
   * el router para redireccionar a otra vista
   * @param asignaturaService
   * @param router
   */
  constructor(private asignaturaService: AsignaturaService, private router: Router) {
    this.asignaturas = new Array<Asignatura>();
  }

  /**
   * primer método que se ejecuta al cargar la vista donde se va a rellenar el array de asignaturas
   * con todas las que están registradas en el sistema
   */
  ngOnInit() {
    this.asignaturas.splice(0,this.asignaturas.length);
    this.asignaturaService.getAsignaturas().subscribe(
      result=>{
        for( let a of result){
          this.asignaturas.push(a);
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * redirecciona a la vista para registrar asignaturas
   */
  onSubmit(){
    this.router.navigate(['/registroasignatura']);
  }

  /**
   * método que filtra la tabla por cada campo de ella que se escriba
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
   * método que llama al servicio para, una vez que se confirma, eliminar la asignatura del sistema
   * @param asignatura
   */
  eliminar(asignatura) {
    if(confirm("¿Estás seguro de querer eliminar la asignatura "+asignatura.nombre+"?")) {
      this.asignaturaService.eliminar(asignatura.id).subscribe(
        result => {
          console.log(result);
          console.log("Eliminado el grupo de ese usuario correctamente");
          this.ngOnInit();
        }, error => {
          console.log(error);
          console.log("Error eliminando el grupo de ese ususario");
        }
      );
    }
  }

  /**
   * redirecciona a la vista de editar una asignatura y almacena en el sessionStorage su abreviatura
   * @param id
   */
  editar(id) {
    window.sessionStorage.setItem('editar',id);
    this.router.navigate(['/editarasignatura']);
  }
}
