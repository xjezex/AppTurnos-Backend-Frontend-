package com.turnos.service;

import com.turnos.model.Paciente;
import com.turnos.model.Profesional;
import com.turnos.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente agregarPaciente(Paciente paciente){
        return pacienteRepository.save(paciente);
    }

    public Paciente modificarPaciente(Long id, Paciente nuevoPaciente) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);
        if (pacienteOptional.isPresent()) {
            Paciente pacienteExistente = pacienteOptional.get();
            pacienteExistente.setNombre(nuevoPaciente.getNombre());
            pacienteExistente.setApellido(nuevoPaciente.getApellido());
            pacienteExistente.setTelefono(nuevoPaciente.getTelefono());
            pacienteExistente.setCorreo(nuevoPaciente.getCorreo());
            pacienteExistente.setObservaciones(nuevoPaciente.getObservaciones());
            return pacienteRepository.save(pacienteExistente);

        } else {
            throw new RuntimeException("Paciente no encontrado con id: " + id);
        }
    }

    public void eliminarPaciente(Long id) {
        Optional<Paciente> pacienteOptional  = pacienteRepository.findById(id);
        if (pacienteOptional.isPresent()) {
            pacienteRepository.deleteById((long) id);
        } else {
            throw new RuntimeException("Paciente no encontrado con id: " + id);
        }
    }

    public List<Paciente> obtenerPacientes() {
        return pacienteRepository.findAll();
    }
}
