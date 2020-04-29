import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';
import { InicioComponent } from './inicio/inicio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './usuarios/registro/registro.component';
import { EstudiantesComponent } from './usuarios/estudiantes/estudiantes.component';
import { ProfesoresComponent } from './usuarios/profesores/profesores.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { GruposReducidosComponent } from './grupos-reducidos/grupos-reducidos.component';
import { RegistroAsignaturaComponent } from './asignaturas/registro-asignatura/registro-asignatura.component';
import { RegistroGrupoComponent } from './grupos-reducidos/registro-grupo/registro-grupo.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectAsignaturasComponent } from './asignaturas/select-asignaturas/select-asignaturas.component';
import { SelectUsuariosComponent } from './usuarios/select-usuarios/select-usuarios.component';
import { MultiSelectAsignaturasComponent } from './asignaturas/multi-select-asignaturas/multi-select-asignaturas.component';
import { MultiSelectGruposComponent } from './grupos-reducidos/multi-select-grupos/multi-select-grupos.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarioComponent } from './calendario/calendario.component';
import { GenerarCalendarioComponent } from './calendario/generar-calendario/generar-calendario.component';
import { MenuCalendarioComponent } from './calendario/menu-calendario/menu-calendario.component';
import { SelectTodosUsuariosComponent } from './usuarios/select-todos-usuarios/select-todos-usuarios.component';
import { ActividadesDocentesComponent } from './actividades-docentes/actividades-docentes.component';
import { RegistroActividadDocenteComponent } from './actividades-docentes/registro-actividad-docente/registro-actividad-docente.component';
import { SelectGruposComponent } from './grupos-reducidos/select-grupos/select-grupos.component';
import { SelectEstudiantesComponent } from './usuarios/select-estudiantes/select-estudiantes.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EstudiantesProfesorComponent } from './usuarios/estudiantes-profesor/estudiantes-profesor.component';
import { MultiSelectGruposProfesorComponent } from './grupos-reducidos/multi-select-grupos-profesor/multi-select-grupos-profesor.component';
import { AsignaturasProfesorComponent } from './asignaturas/asignaturas-profesor/asignaturas-profesor.component';
import { SelectMatriculaEstudianteComponent } from './usuarios/select-matricula-estudiante/select-matricula-estudiante.component';
import { EditarAsignaturaComponent } from './asignaturas/editar-asignatura/editar-asignatura.component';
import { EditarGrupoComponent } from './grupos-reducidos/editar-grupo/editar-grupo.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponent,
    InicioComponent,
    UsuariosComponent,
    RegistroComponent,
    EstudiantesComponent,
    ProfesoresComponent,
    AsignaturasComponent,
    GruposReducidosComponent,
    RegistroAsignaturaComponent,
    RegistroGrupoComponent,
    SelectAsignaturasComponent,
    SelectUsuariosComponent,
    MultiSelectAsignaturasComponent,
    MultiSelectGruposComponent,
    CalendarioComponent,
    GenerarCalendarioComponent,
    MenuCalendarioComponent,
    SelectTodosUsuariosComponent,
    ActividadesDocentesComponent,
    RegistroActividadDocenteComponent,
    SelectGruposComponent,
    SelectEstudiantesComponent,
    EditarUsuarioComponent,
    EstudiantesProfesorComponent,
    MultiSelectGruposProfesorComponent,
    AsignaturasProfesorComponent,
    SelectMatriculaEstudianteComponent,
    EditarAsignaturaComponent,
    EditarGrupoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
