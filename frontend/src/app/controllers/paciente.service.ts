import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    private apiUrl = 'http://localhost:8080/pacientes';

    constructor(private http: HttpClient) {}

    getPacientes(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(this.apiUrl);
    }
  
    createPaciente(paciente: Paciente): Observable<Paciente> {
      return this.http.post<Paciente>(this.apiUrl, paciente);
    }

    updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
      return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
    }

    deletePaciente(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

