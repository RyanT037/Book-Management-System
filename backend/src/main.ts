import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing for the frontend development server.
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Apply global validation rules to all incoming request bodies.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators in the DTO.
    }),
  );

  // Configure Swagger documentation settings.
  const config = new DocumentBuilder()
    .setTitle('Book Management System API')
    .setDescription(
      'API documentation for authentication, books, users, and dashboard statistics.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the JWT token from the login endpoint.',
      },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve the interactive API documentation at the /api endpoint.
  SwaggerModule.setup('api', app, document);

  // Start the server on the configured port or default to 3000.
  await app.listen(process.env.PORT ?? 3000);
}

// Mark the startup promise as intentionally unawaited at the module boundary.
void bootstrap();
