# Dockerfile for building and running the OrderFood app
# Image Name: order-food-app:latest

# Build stage using Amazon Corretto OpenJDK 23 and Maven
FROM maven:3.9.9-amazoncorretto-23 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Final stage to create a minimal image with OpenJDK 23 Corretto
FROM openjdk:23-jdk-slim
WORKDIR /app
COPY --from=build /app/target/OrderFood-0.0.1-SNAPSHOT.jar food.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "food.jar"]
