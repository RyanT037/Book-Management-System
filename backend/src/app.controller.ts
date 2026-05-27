import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

// Root controller for basic API health checks and entry point information.
@ApiTags('App')
@Controller()
export class AppController {
  // Inject AppService to handle the logic for the root endpoint.
  constructor(private readonly appService: AppService) {}

  // Public health check endpoint.
  @Get()
  @ApiOperation({
    summary: 'Check that the API is running',
    description: 'Returns a simple public health message for the API.',
  })
  @ApiOkResponse({
    description: 'API health message.',
    schema: { example: 'Welcome to Mook management system API!' },
  })
  getHello(): string {
    // Returns a welcome message to confirm the service is operational.
    return this.appService.getHello();
  }
}
