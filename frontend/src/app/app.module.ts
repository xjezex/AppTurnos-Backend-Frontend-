import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ProfesionalesComponent } from './views/profesionales/profesionales.component';
import { PacientesComponent } from './views/pacientes/pacientes.component';
import { TurnosComponent } from './views/turnos/turnos.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfesionalesComponent,
    PacientesComponent,
    TurnosComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule // Agrega FullCalendarModule a las importaciones 
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
