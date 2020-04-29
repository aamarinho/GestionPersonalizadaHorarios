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

  public grupos_reducidos : GrupoReducido[];
  iconolupa = faSearch;

  constructor(private grupoService: GruposreducidosService, private router: Router) {
    this.grupos_reducidos = new Array<GrupoReducido>();
  }

  ngOnInit() {
    this.grupos_reducidos.splice(0,this.grupos_reducidos.length);
    this.grupoService.getGrupos().subscribe(
      result=>{
        console.log(result);
        console.log("ENTRO PARA OBTENER LOS GRUPOS")
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
        console.log(this.grupos_reducidos);
        console.log("DIO ERROR AL OBTENER LAS ASIGNATURAS");
      });
  }

  onSubmit(){
    this.router.navigate(['/registrogrupo']);
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

  eliminar(id){
    this.grupoService.eliminar(id).subscribe(
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

  editar(id) {
    window.sessionStorage.setItem('editar',id);
    this.router.navigate(['/editargrupo']);
  }
}
