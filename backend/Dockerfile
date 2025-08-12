FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/thm-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5005

ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "app.jar"]

