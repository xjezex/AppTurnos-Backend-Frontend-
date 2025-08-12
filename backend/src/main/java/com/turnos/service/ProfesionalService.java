package com.turnos.service;

import com.turnos.model.Profesional;
import com.turnos.repository.ProfesionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesionalService {
    @Autowired
    private ProfesionalRepository profesionalRepository;

    public Profesional agregarProfesional(Profesional profesional){
        return profesionalRepository.save(profesional);
    }

    public Profesional modificarProfesional(Long id, Profesional nuevoProfesional) {
        Optional<Profesional> profesionalOptional = profesionalRepository.findById(id);
        if (profesionalOptional.isPresent()) {
            Profesional profesionalExistente = profesionalOptional.get();
            profesionalExistente.setNombre(nuevoProfesional.getNombre());
            profesionalExistente.setApellido(nuevoProfesional.getApellido());
            profesionalExistente.setTelefono(nuevoProfesional.getTelefono());
            profesionalExistente.setEspecialidad(nuevoProfesional.getEspecialidad());
            return profesionalRepository.save(profesionalExistente);
        } else {
            throw new RuntimeException("Profesional no encontrado con id: " + id);
        }
    }

    public void eliminarProfesional(Long id) {
        Optional<Profesional> profesionalOptional = profesionalRepository.findById(id);
        if (profesionalOptional.isPresent()) {
            profesionalRepository.deleteById(id);
        } else {
            throw new RuntimeException("Profesional no encontrado con id: " + id);
        }
    }

    public Profesional getProfesionalById(Long id) {
        Optional<Profesional> profesionalOptional = profesionalRepository.findById(id);
        if (profesionalOptional.isPresent()){
            return profesionalOptional.get();
        } else {
            throw new RuntimeException("Profesional no encontrado con id: " + id);
        }
    }

    public List<Profesional> obtenerProfesionales() {
        return profesionalRepository.findAll();
    }
}
