package com.turnos.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DisponibilidadHoraria {

    private DayOfWeek dia;    // Ej: LUNES, MARTES
    private LocalTime desde;  // Hora de inicio de atención
    private LocalTime hasta; // Hora de fin de atencion
}
