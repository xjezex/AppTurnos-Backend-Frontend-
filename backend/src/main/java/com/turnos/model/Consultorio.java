package com.turnos.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Consultorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre; // Ej: "Consultorio 1"
    private String descripcion;

    private boolean activo;

    @OneToMany(mappedBy = "consultorio")
    private List<Turno> turnos;

    // Disponibilidad horaria semanal (embebida)
    @ElementCollection
    @CollectionTable(name = "consultorio_disponibilidad", joinColumns = @JoinColumn(name = "consultorio_id"))
    private List<DisponibilidadHoraria> disponibilidadHoraria;

}
