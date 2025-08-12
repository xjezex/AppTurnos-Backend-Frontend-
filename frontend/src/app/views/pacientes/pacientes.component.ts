import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/controllers/paciente.service';
import { Paciente } from 'src/app/models/paciente.model';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  nuevoPaciente: Paciente = { id: 0, nombre: '', apellido: '', telefono: '', correo: '', observaciones: '' }; // Ajusta los campos según tu modelo
  filteredPacientes: Paciente[] = [];
  editPaciente: Paciente | null = null;
  searchCriteria: string = '';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.filteredPacientes = pacientes;
    });
  }

  addPaciente(): void {
    this.pacienteService.createPaciente(this.nuevoPaciente).subscribe(paciente => {
      this.pacientes.push(paciente);
      this.filteredPacientes = this.pacientes;
      this.nuevoPaciente = { id: 0, nombre: '', apellido: '', telefono: '', correo: '', observaciones: '' }; // Restablecer el formulario
    });
  }

  deletePaciente(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este paciente?');
    if (confirmation) {
      this.pacienteService.deletePaciente(id).subscribe(() => {
        this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);
        this.filteredPacientes = this.pacientes;
      });
    }
  }

  startEdit(paciente: Paciente): void {
    this.editPaciente = { ...paciente };
  }

  cancelEdit(): void {
    this.editPaciente = null;
  }

  updatePaciente(): void {
    if (this.editPaciente) {
      this.pacienteService.updatePaciente(this.editPaciente.id, this.editPaciente).subscribe(updatedPaciente => {
        const index = this.pacientes.findIndex(p => p.id === updatedPaciente.id);
        if (index !== -1) {
          this.pacientes[index] = updatedPaciente;
        }
        this.editPaciente = null; // Exit edit mode
        this.filteredPacientes = this.pacientes;
      });
    }
  }

  searchPacientes(): void {
    if (this.searchCriteria) {
      this.filteredPacientes = this.pacientes.filter(paciente => 
        paciente.nombre.toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
        paciente.apellido.toLowerCase().includes(this.searchCriteria.toLowerCase())
      );
    } else {
      this.filteredPacientes = this.pacientes;
    }
  }
}
