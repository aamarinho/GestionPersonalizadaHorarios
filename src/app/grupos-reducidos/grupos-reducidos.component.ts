import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GrupoReducido} from '../../models/GrupoReducido';
import {GruposreducidosService} from '../../services/gruposreducidos.service';
import{faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grupos-reducidos',
  templateUrl: './grupos-reducidos.component.html',
  styleUrls: ['./grupos-reducidos.component.css']
})
export class GruposReducidosComponent implements OnInit {

  /**
   * array de grupos reducidos rellenado posteriormente con todos los grupos reducidos registrados
   * en el sistema
   */
  public grupos_reducidos : GrupoReducido[];
  /**
   * icono de lupa mostrado en la vista
   */
  iconolupa = faSearch;

  /**
   * constructor utilizado para instanciar objetos de esta clase a partir de un objeto GrupoReducidoService
   * y el router para redireccionar a otra vista
   * @param grupoService
   * @param router
   */
  constructor(private grupoService: GruposreducidosService, private router: Router) {
    this.grupos_reducidos = new Array<GrupoReducido>();
  }

  /**
   * primer método que se ejecuta al cargar la vista, utilizado para rellenar el array
   * de grupos reducidos con todos los registrados en el sistema
   */
  ngOnInit() {
    this.grupos_reducidos.splice(0,this.grupos_reducidos.length);
    this.grupoService.getGrupos().subscribe(
      result=>{
        for( let g of result){
          if(g.dia=="Monday"){
            g.dia="Lunes";
          } else if(g.dia=="Tuesday"){
            g.dia="Martes";
          } else if(g.dia=="Wednesday"){
            g.dia="Miércoles";
          } else if(g.dia=="Thursday"){
            g.dia="Jueves";
          } else{
            g.dia="Viernes";
          }
          this.grupos_reducidos.push(g);
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método que redirecciona a la vista para registrar un grupo reducido
   */
  onSubmit(){
    this.router.navigate(['/registrogrupo']);
  }

  /**
   * método que filtra la tabla de grupos reducidos según lo escrito en el campo de búsqueda
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
   * método que llama al servicio para, una vez confirmado, eliminar el grupo reducido a partir
   * de su id
   * @param id
   */
  eliminar(id){
    if(confirm("¿Estás seguro de querer eliminar el grupo "+id+"?")) {
      this.grupoService.eliminar(id).subscribe(
        result => {
          this.ngOnInit();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  /**
   * método que redirecciona a la vista para editar un grupo reducido y almacena en el sessionStorage
   * el id del grupo reducido a editar
   * @param id
   */
  editar(id) {
    window.sessionStorage.setItem('editar',id);
    this.router.navigate(['/editargrupo']);
  }
}
