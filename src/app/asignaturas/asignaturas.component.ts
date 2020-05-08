import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Asignatura} from '../../models/Asignatura';
import {AsignaturaService} from '../../services/asignatura.service';
import{faSearch, faBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  public asignaturas : Asignatura[];
  iconolupa = faSearch;
  iconolibro = faBook;

  constructor(private asignaturaService: AsignaturaService, private router: Router) {
    this.asignaturas = new Array<Asignatura>();
  }

  ngOnInit() {
    this.asignaturas.splice(0,this.asignaturas.length);
    this.asignaturaService.getAsignaturas().subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LAS ASIGNATURAS")
        for( let a of result){
          this.asignaturas.push(a);
        }
      },
      error=>{
        console.log(this.asignaturas);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  onSubmit(){
    this.router.navigate(['/registroasignatura']);
  }

  myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

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

  editar(id) {
    window.sessionStorage.setItem('editar',id);
    this.router.navigate(['/editarasignatura']);
  }
}
