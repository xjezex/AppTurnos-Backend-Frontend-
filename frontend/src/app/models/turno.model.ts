export interface Turno {
  id: number;
  fecha: string; // Puedes usar string para fechas en formato ISO
  hora: string; // Puedes usar string para tiempos en formato ISO
  duracion: number; // Lo mismo aplica para duraciones
  paciente: {
    id: number;
    nombre: string;
    apellido: string;
    // Otros campos de paciente
  };
  profesional: {
    id: number;
    nombre: string;
    // Otros campos de profesional
  };
}