package com.turnos.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurnoDTO {

    private Long id;

    @NotNull(message = "La fecha del turno no puede ser nula")
    private LocalDate fecha;

    @NotNull(message = "La hora del turno no puede ser nula")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime hora;

    @NotNull(message = "La duración del turno no puede ser nula")
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private int duracion;

    @NotNull(message = "El ID del paciente no puede ser nulo")
    private Long pacienteId;

    @NotNull(message = "El ID del profesional no puede ser nulo")
    private Long profesionalId;

   //@NotNull(message = "El ID del consultorio no puede ser nulo")
    private Long consultorioId;
}
