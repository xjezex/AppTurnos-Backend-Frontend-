package com.turnos.mapper;

import com.turnos.dto.TurnoDTO;
import com.turnos.model.Paciente;
import com.turnos.model.Profesional;
import com.turnos.model.Turno;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-09T23:26:45-0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.10 (Oracle Corporation)"
)
@Component
public class TurnoMapperImpl implements TurnoMapper {

    @Override
    public TurnoDTO toDTO(Turno turno) {
        if ( turno == null ) {
            return null;
        }

        TurnoDTO turnoDTO = new TurnoDTO();

        turnoDTO.setPacienteId( turnoPacienteId( turno ) );
        turnoDTO.setProfesionalId( turnoProfesionalId( turno ) );
        turnoDTO.setId( turno.getId() );
        turnoDTO.setFecha( turno.getFecha() );
        turnoDTO.setHora( turno.getHora() );
        turnoDTO.setDuracion( turno.getDuracion() );

        return turnoDTO;
    }

    @Override
    public Turno toEntity(TurnoDTO turnoDTO) {
        if ( turnoDTO == null ) {
            return null;
        }

        Turno turno = new Turno();

        turno.setPaciente( turnoDTOToPaciente( turnoDTO ) );
        turno.setProfesional( turnoDTOToProfesional( turnoDTO ) );
        turno.setId( turnoDTO.getId() );
        turno.setFecha( turnoDTO.getFecha() );
        turno.setHora( turnoDTO.getHora() );
        turno.setDuracion( turnoDTO.getDuracion() );

        return turno;
    }

    private Long turnoPacienteId(Turno turno) {
        if ( turno == null ) {
            return null;
        }
        Paciente paciente = turno.getPaciente();
        if ( paciente == null ) {
            return null;
        }
        Long id = paciente.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long turnoProfesionalId(Turno turno) {
        if ( turno == null ) {
            return null;
        }
        Profesional profesional = turno.getProfesional();
        if ( profesional == null ) {
            return null;
        }
        Long id = profesional.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected Paciente turnoDTOToPaciente(TurnoDTO turnoDTO) {
        if ( turnoDTO == null ) {
            return null;
        }

        Paciente paciente = new Paciente();

        paciente.setId( turnoDTO.getPacienteId() );

        return paciente;
    }

    protected Profesional turnoDTOToProfesional(TurnoDTO turnoDTO) {
        if ( turnoDTO == null ) {
            return null;
        }

        Profesional profesional = new Profesional();

        profesional.setId( turnoDTO.getProfesionalId() );

        return profesional;
    }
}
