import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EventInput } from '@fullcalendar/core'; // Para tipar los eventos del calendario

import { Turno } from 'src/app/models/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:8080/turnos'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // === CRUD ===

  // Obtener los turnos desde el backend
  getTurnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo turno
  addTurno(turno: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, turno);
  }

  // Actualizar un turno existente
  updateTurno(id: number, turno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, turno);
  }

  // Eliminar un turno
  deleteTurno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // === FullCalendar Events ===

 getTurnosComoEventos(): Observable<EventInput[]> {
  return this.getTurnos().pipe(
    map((turnos: Turno[]) =>
      turnos.map((turno: Turno) => ({
        id: turno.id.toString(),
        title: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
        start: this.combinarFechaYHora(turno.fecha, turno.hora),
        end: this.calcularFinTurno(turno.fecha, turno.hora, turno.duracion),
        extendedProps: {
          turnoOriginal: turno
        }
      }))
    )
  );
}

  // === Helpers privados ===

  private combinarFechaYHora(fecha: string, hora: string): string {
    return `${fecha}T${hora}`;
  }

  private calcularFinTurno(fecha: string, hora: string, duracion: number): string {
    const [h, m] = hora.split(':').map(Number);
    const inicio = new Date(fecha);
    inicio.setHours(h, m, 0);

    const fin = new Date(inicio.getTime() + duracion * 60000);
    return fin.toISOString().slice(0, 16);
  }

  
}