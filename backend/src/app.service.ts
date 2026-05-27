import { Injectable } from '@nestjs/common';

// Service responsible for handling top-level application logic.
@Injectable()
export class AppService {
  // Returns a simple welcome message.
  getHello(): string {
    // This string is used as a basic health check response for the root endpoint.
    return 'Welcome to the Book Management System API!';
  }
}
