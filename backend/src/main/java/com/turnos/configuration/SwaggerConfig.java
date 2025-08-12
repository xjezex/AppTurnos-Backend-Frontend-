package com.turnos.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Turnos API").version("1.0.0").description("Documentación de la API de Turnos"));
    }

   /* @Bean
    public GroupedOpenApi turnoApi() {
        return GroupedOpenApi.builder()
                .group("turnos")
                .pathsToMatch("/turnos/**")
                .build();
    }  */
}
