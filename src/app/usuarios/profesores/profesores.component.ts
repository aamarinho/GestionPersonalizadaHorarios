import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  /**
   * los métodos y variables de esta clase son exactamente iguales que los definidos
   * en la clase EstudiantesComponent
   */
  public profesores : Usuario[];
  iconolupa = faSearch;

  constructor(private usuarioService: UsuarioService, public router: Router) {
    this.profesores = new Array<Usuario>();
  }

  ngOnInit() {
    this.profesores.splice(0,this.profesores.length);
    this.usuarioService.getProfesores().subscribe(
      result=>{
        console.log(result);
        console.log("ENTRO PARA OBTENER LOS PROFESORES")
        for( let p of result){
          this.profesores.push(p);
        }
        console.log(this.profesores);
      },
      error=>{
        console.log(this.profesores);
        console.log("DIO ERROR AL OBTENER LOS PROFESORES");
      });
  }

  onSubmit(){
    window.sessionStorage.setItem('tipousuario','2');
    this.router.navigate(['/registro']);
  }

  registrarAsignaturas(value){
    window.sessionStorage.setItem('gestionasignaturas',value.email);
    this.router.navigate(['/gestionasignaturas']);
  }

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

  eliminar(profesor) {
    if(confirm("¿Estás seguro de querer eliminar a "+profesor.nombre+"?")) {
      this.usuarioService.eliminar(profesor.email).subscribe(
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

  editar(profesor:Usuario){
    window.sessionStorage.setItem('tipousuario',profesor.tipo);
    window.sessionStorage.setItem('editar',profesor.email);
    this.router.navigate(['/editarusuario']);
  }

}
