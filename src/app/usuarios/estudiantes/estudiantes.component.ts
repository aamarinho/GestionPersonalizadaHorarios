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

  public estudiantes : Usuario[];
  iconolupa = faSearch;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.estudiantes = new Array<Usuario>();
  }

  ngOnInit() {
    this.usuarioService.getEstudiantes().subscribe( //me pierdo
      result=>{
        console.log(result);
        console.log("ENTRO PARA OBTENER LOS ESTUDIANTES")
        for( let e of result){
          this.estudiantes.push(e);
        }
      },
      error=>{
        console.log(this.estudiantes);
        console.log("DIO ERROR AL OBTENER LOS ESTUDIANTES");
      });
  }

  onSubmit(){
    window.sessionStorage.setItem('tipo','3');
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
