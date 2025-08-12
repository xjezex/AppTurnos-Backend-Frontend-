package com.turnos.controller;

import com.turnos.model.Profesional;
import com.turnos.model.Turno;
import com.turnos.service.ProfesionalService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profesionales")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfesionalController {
    @Autowired
    private ProfesionalService profesionalService;

    @PostMapping
    @Operation(summary = "Agregar un profesional", description = "Agregar un profesional con los datos necesarios")
    public Profesional agregarProfesional(@RequestBody Profesional profesional) {
        return profesionalService.agregarProfesional(profesional);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modificar un profesional", description = "Modifica un profesional por su ID")
    public Profesional modificarProfesional(@PathVariable Long id, @RequestBody Profesional nuevoProfesional) {
        return profesionalService.modificarProfesional(id, nuevoProfesional);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un profesional", description = "Elimina un profesional por su ID")
    public void eliminarProfesional(@PathVariable Long id) { profesionalService.eliminarProfesional(id); }

    @GetMapping
    @Operation(summary = "Listar profesionales", description = "Lista de profesionales")
    public List<Profesional> obtenerProfesionales() {
        return profesionalService.obtenerProfesionales();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Devolver un profesional", description = "Devuelve un profesional por su ID")
    public Profesional getProfesionalById(@PathVariable Long id) { return profesionalService.getProfesionalById(id);}
}
