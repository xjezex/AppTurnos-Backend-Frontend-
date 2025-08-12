
# AppTurnos — Backend (Java + Spring Boot)

**Resumen breve**
Backend de la aplicación *AppTurnos*, una API REST para la gestión de turnos de **Pacientes**, **Profesionales** y **Turnos**.
Desarrollado con **Java 17** y **Spring Boot 3.3.0**, sigue una arquitectura en capas (Controller → Service → Repository) y está pensado para ejecutarse con **PostgreSQL** (Docker Compose incluido).

---

## Tabla de contenidos
1. [Tecnologías](#tecnologías)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Configuración (application.properties)](#configuracion-applicationproperties)
4. [Ejecución](#ejecucion)
    - [Con Docker Compose (recomendado)](#con-docker-compose-recomendado)
    - [Local con Maven / IntelliJ](#local-con-maven--intellij)
5. [Endpoints principales / API](#endpoints-principales--api)
6. [Testing](#testing)
7. [Estado actual / Roadmap](#estado-actual--roadmap)
8. [Mapping al perfil solicitado por reclutador](#mapping-al-perfil-solicitado-por-reclutador)
9. [Notas operativas / Consideraciones](#notas-operativas--consideraciones)
10. [Contacto y licencia](#contacto-y-licencia)

---

## Tecnologías
- Java 17
- Spring Boot 3.3.0
    - spring-boot-starter-web
    - spring-boot-starter-data-jpa
    - spring-boot-starter-validation
- PostgreSQL 15 (Docker image en `docker-compose.yml`)
- Lombok (scope: provided)
- MapStruct (mappers entidad ↔ DTO)
- springdoc-openapi (Swagger UI)
- JUnit 5 + Mockito (testing unitario)
- Jackson JSR310 (soporte para `java.time`)
- Docker & Docker Compose

---

## Estructura del proyecto
(ubicación principal: `src/main/java/com/turnos`)

```
src/main/java/com/turnos
├── controller         # Controladores REST (TurnoController, PacienteController, ProfesionalController)
├── dto                # DTOs (TurnoDTO, PacienteDTO, ProfesionalDTO)
├── entity             # Entidades JPA (Turno, Paciente, Profesional)
├── exception          # Manejador global de excepciones (GlobalExceptionHandler)
├── mapper             # MapStruct mappers (TurnoMapper, PacienteMapper, ProfesionalMapper)
├── repository         # Repositorios Spring Data (TurnoRepository, PacienteRepository, ProfesionalRepository)
├── service            # Lógica de negocio (TurnoService, PacienteService, ProfesionalService)
├── config             # Configuración (SwaggerConfig, etc.)
└── model              # Modelos auxiliares (DisponibilidadHoraria, etc.)
```

Archivos principales de configuración:
```
/src/main/resources/
 ├── application.properties
 ├── application.dev.properties
 └── application.local.properties
```

---

## Configuración (`application.properties` - fragmento importante)
El archivo actual incluye (según lo provisto):

```properties
spring.application.name=turnosApp
spring.profiles.active=loc
spring.mvc.pathmatch.matching-strategy=ANT_PATH_MATCHER
server.address=0.0.0.0

spring.datasource.url=jdbc:postgresql://localhost:5432/turnos_db
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=admin
spring.datasource.password=admin
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Notas:
- En Docker, el servicio de base de datos corre en el host `db` (ver `docker-compose.yml`). Cuando uses Docker Compose, las variables de entorno en `docker-compose.yml` sobreescriben la conexión local.
- `spring.profiles.active=loc` está definido; revisá que el perfil exista o ajustá a `local` / `dev` según corresponda.

---

## Ejecución

### Con Docker Compose (recomendado)
El `docker-compose.yml` incluido levanta:
- una instancia de PostgreSQL (`postgres:15`)
- el backend (java con springBoot)
- pgAdmin para gestión visual de la DB

Comando:
```bash
docker compose up --build
```

Servicios y puertos expuestos (según `docker-compose.yml`):
- PostgreSQL: `localhost:5432` (mappeado) — DB: `turnos_db` (user: `admin`, pass: `admin`)
- Backend: `localhost:8080`
- pgAdmin: `localhost:5050` (usuario: `admin@admin.com` / pass: `admin`)

Importante: el `backend` en Docker recibe variables de entorno:
```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/turnos_db
  SPRING_DATASOURCE_USERNAME: admin
  SPRING_DATASOURCE_PASSWORD: admin
```
Eso hace que dentro del contenedor el host DB sea `db` (no `localhost`).

---

### Local (Maven / IntelliJ)
1. Configurar una base PostgreSQL local o ejecutar sólo el contenedor de `db`.
2. Ajustar `application.properties` o pasar variables de entorno:
   ```bash
   export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/turnos_db
   export SPRING_DATASOURCE_USERNAME=admin
   export SPRING_DATASOURCE_PASSWORD=admin
   mvn spring-boot:run
   ```
3. Para empaquetar:
   ```bash
   mvn clean package
   java -jar target/AppTurnos-1.0.0-SNAPSHOT.jar
   ```

---

## Endpoints principales / API
La API expone endpoints CRUD para los recursos principales. Convención de rutas (ejemplo):

```
GET    /api/pacientes
GET    /api/pacientes/{id}
POST   /api/pacientes
PUT    /api/pacientes/{id}
DELETE /api/pacientes/{id}

GET    /api/profesionales
GET    /api/profesionales/{id}
POST   /api/profesionales
PUT    /api/profesionales/{id}
DELETE /api/profesionales/{id}

GET    /api/turnos
GET    /api/turnos/{id}
POST   /api/turnos
PUT    /api/turnos/{id}
DELETE /api/turnos/{id}
```

- La documentación automática por `springdoc-openapi` suele estar disponible en:
    - `http://localhost:8080/swagger-ui.html`
    - o `http://localhost:8080/swagger-ui/index.html`
    - JSON raw: `http://localhost:8080/v3/api-docs`

**Ejemplo de petición (crear paciente)**

```http
POST /api/pacientes
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "221-9998877",
  "correo": "juan.perez@example.com",
  "observaciones": "Sin observaciones"
}
```

**Ejemplo de petición (crear turno)**

```http
POST /api/turnos
Content-Type: application/json

{
  "fecha": "2025-08-24",
  "hora": "14:30",
  "duracion": 60,
  "pacienteId": 3,
  "profesionalId": 2
}
```

> Ajustá los campos reales según tus DTOs. Los anteriores son ejemplos de convención común y pueden adaptarse a tus `TurnoDTO`.

---

## Testing
El proyecto ya incluye dependencias para JUnit 5 y Mockito. Para ejecutar tests:

```bash
mvn test
```

---

## Estado actual / Roadmap
**Completo / Implementado**
- CRUD de Pacientes, Profesionales y Turnos.
- Validaciones con Hibernate Validator.
- MapStruct para mapeo entidad ↔ DTO.
- Documentación automática con springdoc-openapi.
- Docker Compose con PostgreSQL y pgAdmin.
- Estructura de proyecto con capas bien separadas.

**En desarrollo**
- Autenticación/Autorización (Spring Security + JWT) — planificado.
- Cobertura de tests ampliada (muestras unitarias y de integración).
- Scripts de datos iniciales (seed) para facilitar evaluación.
- Analisis general en busca de refactor code.

---

## Contacto y licencia
- Autor: *Ezequiel* (repositorio personal — proyecto demostrativo)
- Licencia: Uso personal / demostrativo.

---