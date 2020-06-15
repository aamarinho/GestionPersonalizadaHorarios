import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  /**
   * variable usada para almacenar todos los estudiantes registrados en el sistema
   */
  public estudiantes : Usuario[];
  /**
   * icono de lupa mostrado en la vista
   */
  iconolupa = faSearch;

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto usuarioService
   * y el router para redireccionar a otra vista
   * @param usuarioService
   * @param router
   */
  constructor(private usuarioService: UsuarioService, public router: Router) {
    this.estudiantes = new Array<Usuario>();
  }

  /**
   * primer método que se ejecuta al cargar la vista, utilizada para rellenar el array
   * con todos los estudiantes
   */
  ngOnInit() {
    this.estudiantes.splice(0,this.estudiantes.length);
    this.usuarioService.getEstudiantes().subscribe(
      result=>{
        for( let e of result){
          this.estudiantes.push(e);
        }
      },
      error=>{
        console.log(error);
      });
  }

  /**
   * método usado para redireccionar a la vista de registro
   */
  onSubmit(){
    window.sessionStorage.setItem('tipousuario','3');
    this.router.navigate(['/registro']);
  }

  /**
   * método usado para redireccionar a la vista para gestionar las asignaturas de ese usuario
   * @param value
   */
  registrarAsignaturas(value){
    window.sessionStorage.setItem('gestionasignaturas',value.email);
    this.router.navigate(['/gestionasignaturas']);
  }

  /**
   * método usado para redireccionar a la vista para gestionar los grupos reducidos de ese usuario
   * @param value
   */
  registrarGrupos(value){
    window.sessionStorage.setItem('gestiongrupos',value.email);
    this.router.navigate(['/gestiongrupos']);
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


  eliminar(estudiante) {
    if(confirm("¿Estás seguro de querer eliminar a "+estudiante.nombre+"?")) {
      this.usuarioService.eliminar(estudiante.email).subscribe(
        result=>{
          console.log(result);
          console.log("Eliminado el grupo de ese usuario correctamente");
          this.ngOnInit();
        } , error=>{
          console.log(error);
          console.log("Error eliminando el grupo de ese ususario");
        }
      );
    }
  }

  editar(estudiante:Usuario){
    window.sessionStorage.setItem('tipousuario',estudiante.tipo);
    window.sessionStorage.setItem('editar',estudiante.email);
    this.router.navigate(['/editarusuario']);
  }
}
