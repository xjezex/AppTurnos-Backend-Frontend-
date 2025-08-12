import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesional } from '../models/profesional.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
  private apiUrl = 'http://localhost:8080/profesionales';

  constructor(private http: HttpClient) {}

  getProfesionales(): Observable<Profesional[]> {
    return this.http.get<Profesional[]>(this.apiUrl);
  }

  getProfesional(id: number): Observable<Profesional> {
    return this.http.get<Profesional>(`${this.apiUrl}/${id}`);
  }

  createProfesional(profesional: Profesional): Observable<Profesional> {
    return this.http.post<Profesional>(this.apiUrl, profesional);
  }

  updateProfesional(id: number, profesional: Profesional): Observable<Profesional> {
    return this.http.put<Profesional>(`${this.apiUrl}/${id}`, profesional);
  }

  deleteProfesional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}