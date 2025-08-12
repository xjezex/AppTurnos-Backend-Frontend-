    package com.turnos.controller;

    import com.turnos.dto.TurnoDTO;
    import com.turnos.model.Profesional;
    import com.turnos.model.Turno;
    import com.turnos.service.TurnoService;
    import io.swagger.v3.oas.annotations.Operation;
    import io.swagger.v3.oas.annotations.responses.ApiResponse;
    import io.swagger.v3.oas.annotations.responses.ApiResponses;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.validation.annotation.Validated;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/turnos")
    @CrossOrigin(origins = "http://localhost:4200")
    public class TurnoController {
        @Autowired
        private TurnoService turnoService;

        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Operación exitosa"),
                @ApiResponse(responseCode = "404", description = "Turno no encontrado"),
                @ApiResponse(responseCode = "400", description = "Solicitud incorrecta")
        })

        @PostMapping(consumes = "application/json", produces = "application/json")
        @Operation(summary = "Agregar un turno", description = "Agrega un turno con los datos necesarios")
        public ResponseEntity<TurnoDTO> agregarTurno(@Validated @RequestBody TurnoDTO turnoDTO) {
            return ResponseEntity.ok(turnoService.agregarTurno(turnoDTO));
        }

        @PutMapping("/{id}")
        @Operation(summary = "Modificar un turno", description = "Modifica un turno por su ID")
        public ResponseEntity<TurnoDTO> modificarTurno(@PathVariable Long id, @RequestBody TurnoDTO turnoDTO) {
            // Verificamos que el ID en la URL no sea nulo
            if (id == null) {
                return ResponseEntity.badRequest().build();
            }

            // Aseguramos que el ID del nuevoTurno es el mismo que el de la URL
            turnoDTO.setId(id);

            TurnoDTO turnoModificado = turnoService.modificarTurno(id, turnoDTO);
            if (turnoModificado == null) {
                return ResponseEntity.notFound().build(); // En caso de que no se encuentre el turno
            }

            return ResponseEntity.ok(turnoModificado);
        }

        @DeleteMapping("/{id}")
        @Operation(summary = "Eliminar un turno", description = "Elimina un turno por su ID")
        public void eliminarTurno(@PathVariable Long id) {
            turnoService.eliminarTurno(id);
        }

        @GetMapping
        @Operation(summary = "Listar turnos", description = "Lista de turnos")
        public List<Turno> obtenerTurnos() {
            return turnoService.obtenerTurnos();
        }

        @GetMapping("/{id}")
        @Operation(summary = "Devolver un turno", description = "Devuelve un turno por su ID")
        public Turno getTurnoById(@PathVariable Long id) { return turnoService.getTurnoById(id);}
    }