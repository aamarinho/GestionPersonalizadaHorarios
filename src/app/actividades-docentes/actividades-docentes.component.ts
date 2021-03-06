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

  /**
   * array de objetos Calendario usado para rellenar de eventos del sistema
   */
  public eventos : Calendario[];
  /**
   * icono de lupa usado para mostrar en el formulario
   */
  iconolupa = faSearch;

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto CalendarioService, un objeto UsuarioService
   * y el router para redireccionar a otra vista
   * @param calendarioService
   * @param usuarioService
   * @param router
   */
  constructor(private calendarioService: CalendarioService, private usuarioService : UsuarioService,private router: Router) {
    this.eventos = new Array<Calendario>();
  }

  /**
   * primer método que se ejecuta al cargar la vista donde vamos a recuperar todas las actividades docentes de un
   * profesor con su email
   */
  ngOnInit() {
    this.eventos.splice(0,this.eventos.length);
    this.calendarioService.getEventosCalendario().subscribe(
      result=>{
        for( let e of result){
          if(window.sessionStorage.getItem('email')==e.responsable){
            this.eventos.push(e);
          }
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que redirecciona a la vista para registrar una actividad docente
   */
  onSubmit(){
    this.router.navigate(['/registroactividaddocente']);
  }

  /**
   * método que busca por cualquier campo de la tabla escribiendo en el buscador
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
   * método que redirecciona a la vista para editar una actividad docente y guarda el id en el sessionStorage
   * @param id
   */
  editar(id){
    window.sessionStorage.setItem('editar',id);
    this.router.navigate(['/editaractividaddocente']);
  }

  /**
   * método que, si se confirma, llama al servicio para eliminar una actividad docente a partir de su id
   * @param evento
   */
  eliminar(evento){
    if(confirm("¿Estás seguro de querer eliminar "+evento.nombre+" de "+evento.id_grupo+"?")) {
      this.calendarioService.eliminar(evento.id).subscribe(
        result => {
          console.log(result);
          this.ngOnInit();
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
