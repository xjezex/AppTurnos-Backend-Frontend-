package com.turnos.mapper;

import com.turnos.dto.TurnoDTO;
import com.turnos.model.Turno;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TurnoMapper {

    @Mapping(source = "paciente.id", target = "pacienteId")
    @Mapping(source = "profesional.id", target = "profesionalId")
    //@Mapping(source = "consultorio.id", target = "consultorioId")
    TurnoDTO toDTO(Turno turno);

    @Mapping(source = "pacienteId", target = "paciente.id")
    @Mapping(source = "profesionalId", target = "profesional.id")
    //@Mapping(source = "consultorioId", target = "consultorio.id")
    Turno toEntity(TurnoDTO turnoDTO);
}
