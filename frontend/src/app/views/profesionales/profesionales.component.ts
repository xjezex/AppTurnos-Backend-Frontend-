import { Component, OnInit } from '@angular/core';
import { ProfesionalService } from 'src/app/controllers/profesional.service';
import { Profesional } from 'src/app/models/profesional.model';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {
  profesionales: Profesional[] = [];
  nuevoProfesional: Profesional = { id: 0, nombre: '', apellido: '', telefono: '', especialidad: '' }; // Ajusta los campos según tu modelo
  filteredProfesionales: Profesional[] = [];
  editProfesional: Profesional | null = null;
  searchCriteria: string = '';

  constructor(private profesionalService: ProfesionalService) {}

  ngOnInit(): void {
    this.profesionalService.getProfesionales().subscribe(profesionales => {
      this.profesionales = profesionales;
      this.filteredProfesionales = profesionales;
    });
  }

  addProfesional(): void {
    this.profesionalService.createProfesional(this.nuevoProfesional).subscribe(profesional => {
      this.profesionales.push(profesional);
      this.filteredProfesionales = this.profesionales;
      this.nuevoProfesional = { id: 0, nombre: '', apellido: '', telefono: '', especialidad: '' }; // Restablecer el formulario
    });
  }

  deleteProfesional(id: number): void {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar este profesional?');
    if (confirmation) {
      this.profesionalService.deleteProfesional(id).subscribe(() => {
        this.profesionales = this.profesionales.filter(profesional => profesional.id !== id);
      });
    }
  }

  startEdit(profesional: Profesional): void {
    this.editProfesional = { ...profesional };
  }

  cancelEdit(): void {
    this.editProfesional = null;
  }

  updateProfesional(): void {
    if (this.editProfesional) {
      this.profesionalService.updateProfesional(this.editProfesional.id, this.editProfesional).subscribe(updatedProfesional => {
        const index = this.profesionales.findIndex(p => p.id === updatedProfesional.id);
        if (index !== -1) {
          this.profesionales[index] = updatedProfesional;
        }
        this.editProfesional = null; // Exit edit mode
      });
    }
  }

  searchProfesionales(): void {
    if (this.searchCriteria) {
      this.filteredProfesionales = this.profesionales.filter(profesional => 
        profesional.nombre.toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
        profesional.apellido.toLowerCase().includes(this.searchCriteria.toLowerCase())
      );
    } else {
      this.filteredProfesionales = this.profesionales;
    }
  }

  
  
}
