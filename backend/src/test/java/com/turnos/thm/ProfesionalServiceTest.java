package com.turnos.thm;

import com.turnos.model.Profesional;
import com.turnos.service.ProfesionalService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProfesionalServiceTest {
/*
    @Mock
    private ProfesionalService profesionalService; // Simulando el servicio

    @Test
    public void testObtenerProfesionalPorId() {
        // Datos de prueba
        Profesional profesional = new Profesional(1l,"Juan","Topo","221-123123","Masoterapia",1);

        // Configurar Mockito para devolver el profesional simulado
        when(profesionalService.getProfesionalById(1L)).thenReturn(Optional.of(profesional));

        // Llamada al método de prueba
        Optional<Profesional> resultado = profesionalService.getProfesionalById(1L);

        // Verificaciones
        assertEquals("Juan Pérez", resultado.get().getNombre());
        assertEquals("Cardiología", resultado.get().getEspecialidad());
    } */
}