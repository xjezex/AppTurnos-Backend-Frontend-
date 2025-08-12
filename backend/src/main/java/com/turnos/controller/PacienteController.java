package com.turnos.controller;

import com.turnos.service.PacienteService;
import com.turnos.model.Paciente;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin(origins = "http://localhost:4200")
public class PacienteController {
    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    @Operation(summary = "Agregar un paciente", description = "Agregar un paciente con los datos necesarios")
    public Paciente agregarPaciente(@RequestBody Paciente paciente) {
        return pacienteService.agregarPaciente(paciente);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modificar un paciente", description = "Modifica un paciente por su ID")
    public Paciente modificarPaciente(@PathVariable Long id, @RequestBody Paciente nuevoPaciente) {
        return pacienteService.modificarPaciente(id, nuevoPaciente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un paciente", description = "Elimina un paciente por su ID")
    public void eliminarPaciente(@PathVariable Long id) { pacienteService.eliminarPaciente(id); }

    @GetMapping
    @Operation(summary = "Listar pacientes", description = "Lista de pacientes")
    public List<Paciente> obtenerPacientes() {
        return pacienteService.obtenerPacientes();
    }
}
