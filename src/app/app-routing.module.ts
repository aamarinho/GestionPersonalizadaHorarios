import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {RegistroComponent} from './usuarios/registro/registro.component';
import {CabeceraComponent} from './cabecera/cabecera.component';
import {EstudiantesComponent} from './usuarios/estudiantes/estudiantes.component';
import {ProfesoresComponent} from './usuarios/profesores/profesores.component';
import {AsignaturasComponent} from './asignaturas/asignaturas.component';
import {GruposReducidosComponent} from './grupos-reducidos/grupos-reducidos.component';
import {RegistroAsignaturaComponent} from './asignaturas/registro-asignatura/registro-asignatura.component';
import {RegistroGrupoComponent} from './grupos-reducidos/registro-grupo/registro-grupo.component';
import {MultiSelectAsignaturasComponent} from './asignaturas/multi-select-asignaturas/multi-select-asignaturas.component';
import {MultiSelectGruposComponent} from './grupos-reducidos/multi-select-grupos/multi-select-grupos.component';
import {CalendarioComponent} from './calendario/calendario.component';
import {GenerarCalendarioComponent} from './calendario/generar-calendario/generar-calendario.component';
import {MenuCalendarioComponent} from './calendario/menu-calendario/menu-calendario.component';
import {SelectTodosUsuariosComponent} from './usuarios/select-todos-usuarios/select-todos-usuarios.component';
import {ActividadesDocentesComponent} from './actividades-docentes/actividades-docentes.component';
import {RegistroActividadDocenteComponent} from './actividades-docentes/registro-actividad-docente/registro-actividad-docente.component';
import {SelectEstudiantesComponent} from './usuarios/select-estudiantes/select-estudiantes.component';
import {EditarUsuarioComponent} from './usuarios/editar-usuario/editar-usuario.component';
import {EstudiantesProfesorComponent} from './usuarios/estudiantes-profesor/estudiantes-profesor.component';
import {MultiSelectGruposProfesorComponent} from './grupos-reducidos/multi-select-grupos-profesor/multi-select-grupos-profesor.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'cabecera', component:CabeceraComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'estudiantes', component: EstudiantesComponent},
  {path: 'profesores', component: ProfesoresComponent},
  {path: 'asignaturas', component: AsignaturasComponent},
  {path: 'gruposreducidos', component: GruposReducidosComponent},
  {path: 'registroasignatura', component: RegistroAsignaturaComponent},
  {path: 'registrogrupo', component: RegistroGrupoComponent},
  {path: 'gestionasignaturas', component: MultiSelectAsignaturasComponent},
  {path: 'gestiongrupos', component: MultiSelectGruposComponent},
  {path: 'menucalendario', component:MenuCalendarioComponent},
  {path: 'generarcalendario', component:GenerarCalendarioComponent},
  {path: 'calendario', component:CalendarioComponent},
  {path: 'seleccionarusuario', component:SelectTodosUsuariosComponent},
  {path: 'actividadesdocentes', component:ActividadesDocentesComponent},
  {path: 'registroactividaddocente', component:RegistroActividadDocenteComponent},
  {path: 'seleccionarestudiante', component:SelectEstudiantesComponent},
  {path: 'editarusuario', component:EditarUsuarioComponent},
  {path: 'estudiantesprofesor', component:EstudiantesProfesorComponent},
  {path: 'modificargrupoestudiante', component:MultiSelectGruposProfesorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
