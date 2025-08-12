import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/core';
import { addMinutes } from 'date-fns';
import { EventInput } from '@fullcalendar/core'; // Para tipar los eventos del calendario

import { TurnoService } from 'src/app/controllers/turno.service';
import { Turno } from 'src/app/models/turno.model';
import { CalendarEvent } from 'src/app/models/calendar-event.model';
import { el } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

   // Lista original de turnos cargados desde el backend
  turnosOriginales: Turno[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    locales: [esLocale], // Idioma 
    locale: 'es',
    slotMinTime: '07:00:00', // Hora de inicio visible
    slotMaxTime: '22:00:00', // Hora de fin visible
    slotDuration: '00:30:00', // Intervalos de 30 minutos
    snapDuration: '00:15:00', // Ajuste de tiempo a intervalos de 15 minutos
    nowIndicator: true, // Marca la hora actual
    dayMaxEvents: true, // allow "more" link when too many events
    editable: true,
    eventDrop: this.onEventDrop.bind(this), // Captura el evento de mover turno
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: []
    //events: 'https://fullcalendar.io/api/demo-feeds/events.json'
  };

  constructor(private eventService: TurnoService) {}

  ngOnInit(): void {
  this.loadEvents();
}

loadEvents(): void {
  this.eventService.getTurnos().subscribe(turnos => {
    this.turnosOriginales = turnos; // Ahora sí son Turno[]
    this.calendarOptions.events = turnos.map(turno => this.transformarTurnoAEvento(turno));
  });
}

// Nueva función que convierte Turno -> EventInput
transformarTurnoAEvento(turno: Turno): EventInput {
  const startDate = new Date(`${turno.fecha}T${turno.hora}`);
  const endDate = addMinutes(startDate, turno.duracion);

  return {
    id: turno.id.toString(),
    title: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    backgroundColor: 'blue',
    borderColor: 'blue',
    textColor: 'white',
    extendedProps: {
      turnoOriginal: turno
    }
  };
}

  // Maneja el evento de mover un turno
  onEventDrop(info: any): void {
    const idTurno = +info.event.id;

    // Buscar el turno original para mantener todos los datos
    const turnoOriginal = this.turnosOriginales.find(t => t.id === idTurno);
    if (!turnoOriginal) {
      console.error('No se encontró el turno original');
      info.revert();
      return;
    }

    // Crear copia actualizada
    const turnoActualizado = {
      id: idTurno,
      fecha: info.event.start.toISOString().split("T")[0],
      hora: info.event.start.toTimeString().substring(0, 5),
      duracion: turnoOriginal.duracion,
      pacienteId: turnoOriginal.paciente.id,
      profesionalId: turnoOriginal.profesional.id
    };

    console.log('Enviando turno actualizado:', turnoActualizado);
    const confirmation = confirm('¿Estás seguro de que desea actualizar este turno?');
    if (confirmation === true) {
      this.eventService.updateTurno(idTurno, turnoActualizado).subscribe({
        next: () => console.log('Turno actualizado correctamente'),
        error: (err) => {
          console.error('Error al actualizar el turno', err);
          info.revert();
        }
      });
    } else {
      info.revert();
    }
  }
  
    
}