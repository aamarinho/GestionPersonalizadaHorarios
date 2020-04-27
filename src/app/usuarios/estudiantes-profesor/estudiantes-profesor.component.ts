import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/Usuario';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-estudiantes-profesor',
  templateUrl: './estudiantes-profesor.component.html',
  styleUrls: ['./estudiantes-profesor.component.css']
})
export class EstudiantesProfesorComponent implements OnInit {

  public estudiantes : Usuario[];
  public idsestudiantes : String[];
  iconolupa = faSearch;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.estudiantes = new Array<Usuario>();
    this.idsestudiantes=new Array<String>();
  }

  ngOnInit() {
    this.estudiantes.splice(0,this.estudiantes.length);
    this.idsestudiantes.splice(0,this.idsestudiantes.length);
    this.usuarioService.getEstudiantesProfesor(window.sessionStorage.getItem('email')).subscribe( //me pierdo
      result=>{
        console.log(result);
        console.log("ENTRO PARA OBTENER LOS ESTUDIANTES")
        for( let e of result){
          if(!this.idsestudiantes.includes(e.email)){
            this.estudiantes.push(e);
            this.idsestudiantes.push(e.email);
          }
        }
      },
      error=>{
        console.log(this.estudiantes);
        console.log("DIO ERROR AL OBTENER LOS ESTUDIANTES");
      });
  }

  onSubmit(){
    window.sessionStorage.setItem('tipousuario','3');
    this.router.navigate(['/registro']);
  }

  registrarGrupos(value){
    window.sessionStorage.setItem('gestiongrupos',value.email);
    this.router.navigate(['/modificargrupoestudiante']);
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


  eliminar(estudiante) {
    this.usuarioService.eliminar(estudiante).subscribe(
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

  editar(estudiante:Usuario){
    window.sessionStorage.setItem('tipousuario',estudiante.tipo);
    window.sessionStorage.setItem('editar',estudiante.email);
    this.router.navigate(['/editarusuario']);
  }

}
