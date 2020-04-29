import { Component, OnInit } from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {CalendarioService} from '../../services/calendario.service';
import {Calendario} from '../../models/Calendario';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-actividades-docentes',
  templateUrl: './actividades-docentes.component.html',
  styleUrls: ['./actividades-docentes.component.css']
})
export class ActividadesDocentesComponent implements OnInit {

  public eventos : Calendario[];
  iconolupa = faSearch;

  constructor(private calendarioService: CalendarioService, private usuarioService : UsuarioService,private router: Router) {
    this.eventos = new Array<Calendario>();
  }

  ngOnInit() {
    this.calendarioService.getEventosCalendario().subscribe(
      result=>{
        console.log(result);
        console.log("ENTRO PARA OBTENER LOS GRUPOS")
        for( let e of result){
          if(window.sessionStorage.getItem('email')==e.responsable){
            this.eventos.push(e);
          }
        }
      },
      error=>{
        console.log(this.eventos);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  onSubmit(){
    this.router.navigate(['/registroactividaddocente']);
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

}
