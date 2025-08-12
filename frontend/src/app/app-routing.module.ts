import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesionalesComponent } from './views/profesionales/profesionales.component';
import { PacientesComponent } from './views/pacientes/pacientes.component';
import { HomeComponent } from './views/home/home.component';
import { TurnosComponent } from './views/turnos/turnos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'profesionales', component: ProfesionalesComponent },
  { path: 'turnos', component: TurnosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
