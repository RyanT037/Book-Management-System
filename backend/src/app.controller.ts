import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    return this.appService.getHello();
  }
}
