import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../../models/Asignatura';
import {faBook, faSearch} from '@fortawesome/free-solid-svg-icons';
import {AsignaturaService} from '../../../services/asignatura.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asignaturas-profesor',
  templateUrl: './asignaturas-profesor.component.html',
  styleUrls: ['./asignaturas-profesor.component.css']
})
export class AsignaturasProfesorComponent implements OnInit {

  public asignaturas : Asignatura[];
  iconolupa = faSearch;
  iconolibro = faBook;

  constructor(private asignaturaService: AsignaturaService, private router: Router) {
    this.asignaturas = new Array<Asignatura>();
  }

  ngOnInit() {
    this.asignaturas.splice(0,this.asignaturas.length);
    this.asignaturaService.getAsignaturasProfesor(window.sessionStorage.getItem('email')).subscribe(
      result=>{
        console.log("ENTRO PARA OBTENER LAS ASIGNATURAS")
        for( let a of result){
          a.email=window.sessionStorage.getItem('email');
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

  gestionarEstudiantes(asignatura: Asignatura) {
    window.sessionStorage.setItem('gestionestudiantes',asignatura.id);
    this.router.navigate(['/estudiantesprofesor']);
  }
}
