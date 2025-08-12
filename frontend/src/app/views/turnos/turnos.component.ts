import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/controllers/turno.service';
import { PacienteService } from 'src/app/controllers/paciente.service';
import { ProfesionalService } from 'src/app/controllers/profesional.service';

import { Turno } from 'src/app/models/turno.model';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})

export class TurnosComponent implements OnInit {

  pacientes: any[] = [];
  profesionales: any[] = [];
  turnos: any[] = [];
  filteredTurnos: any[] = [];
  editTurno: any = null; 
  searchCriteria: string = '';

  nuevoTurno: any = {
    pacienteId: null,
    profesionalId: null,
    fecha: '',
    hora: ''
  };

  constructor(
    private turnoService: TurnoService,
    private pacienteService: PacienteService,
    private profesionalService: ProfesionalService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarProfesionales();
    this.cargarTurnos();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe((data: any[]) => {
      this.pacientes = data;
    });
  }

  cargarProfesionales(): void {
    this.profesionalService.getProfesionales().subscribe((data: any[]) => {
      this.profesionales = data;
    });
  }

  cargarTurnos(): void {
  this.turnoService.getTurnos().subscribe({
    next: (data: any[]) => {
      this.turnos = data;
      this.ordenarTurnos(); // Esto ordena la lista 'this.turnos'
      this.filteredTurnos = [...this.turnos]; // Aquí actualizamos filteredTurnos con los datos ya ordenados
    },
    error: (error) => {
      console.error('Error al cargar turnos:', error);
    }
  });
}

ordenarTurnos(): void {
  this.turnos.sort((a, b) => {
    const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
    const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
    return fechaHoraA.getTime() - fechaHoraB.getTime();
  });
}

  agregarTurno(): void {

  const turno = {
    fecha: this.nuevoTurno.fecha,
    hora: this.nuevoTurno.hora,
    duracion: this.nuevoTurno.duracion,
    pacienteId: this.nuevoTurno.pacienteId ,
    profesionalId: this.nuevoTurno.profesionalId 
  };

  

  this.turnoService.addTurno(turno).subscribe({
    next: (nuevoTurnoAgregado) => {
      this.turnos.push(nuevoTurnoAgregado);
      this.resetearFormulario();
      this.cargarTurnos(); // Recargar turnos para reflejar el nuevo turno
      console.log('Turno agregado exitosamente:', nuevoTurnoAgregado);
    },
    error: (error) => {
      console.log('Objeto turno enviado:', turno);
      console.error('Error al agregar turno:', error);
      
    }
  });
}

  eliminarTurno(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este turno?');
    if (confirmation) {
      this.turnoService.deleteTurno(id).subscribe(() => {
        this.turnos = this.turnos.filter(turno => turno.id !== id);
        this.cargarTurnos(); // Para asegurarte que se refleja el cambio
      });

    }
  }

  startEdit(turno: any): void {
  this.editTurno = {
    ...turno,
    pacienteId: turno.paciente?.id,
    profesionalId: turno.profesional?.id
  };
}

  cancelEdit(): void {
    this.editTurno = null;
  }

  guardarEdicion(turno: any): void {
  const turnoDTO = {
    id: turno.id,
    fecha: turno.fecha,
    hora: turno.hora.substring(0, 5),
    duracion: turno.duracion,
    pacienteId: turno.pacienteId,
    profesionalId: turno.profesionalId
  };
  console.log('DTO enviado:', turnoDTO);

  this.turnoService.updateTurno(turno.id, turnoDTO).subscribe({
    next: (updatedTurno) => {
      const index = this.turnos.findIndex(t => t.id === updatedTurno.id);
      if (index !== -1) {
        this.turnos[index] = updatedTurno;
      }
      this.editTurno = null;
      this.cargarTurnos(); // Para asegurarte que se refleja el cambio
    },
    error: (error) => {
      console.error('Error al actualizar el turno:', error);
    }
  });
}

  searchTurnos() {
  if (!this.searchCriteria.trim()) {
    this.filteredTurnos = [...this.turnos];
    return;
  }

  const criterio = this.searchCriteria.toLowerCase();
  this.filteredTurnos = this.turnos.filter(turno =>
    turno.paciente?.nombre?.toLowerCase().includes(criterio) ||
    turno.paciente?.apellido?.toLowerCase().includes(criterio) ||
    turno.profesional?.nombre?.toLowerCase().includes(criterio) ||
    turno.profesional?.apellido?.toLowerCase().includes(criterio)
  );
}

  resetearFormulario(): void {
    this.nuevoTurno = {
      pacienteId: null,
      profesionalId: null,
      fecha: '',
      hora: ''
    };
  }

  esTurnoFuturo(turno: any): boolean {
    const fechaHoraActual = new Date(); // Obtiene la fecha y hora actual
    
    // Combina la fecha y la hora del turno en un solo objeto Date
    // Asegúrate de que turno.fecha y turno.hora tengan el formato esperado (YYYY-MM-DD y HH:MM)
    const [year, month, day] = turno.fecha.split('-').map(Number);
    const [hours, minutes] = turno.hora.split(':').map(Number);

    // Los meses en JavaScript son base 0 (enero es 0, diciembre es 11)
    const fechaHoraTurno = new Date(year, month - 1, day, hours, minutes);

    // Compara el timestamp del turno con el timestamp actual
    return fechaHoraTurno.getTime() > fechaHoraActual.getTime();
  }
}