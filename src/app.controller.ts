import { Controller, Get } from '@hazeljs/core';
import { Swagger, ApiOperation } from '@hazeljs/swagger';
import { AppService } from './app.service';

@Controller('')
@Swagger({
  title: 'App',
  description: 'Application root endpoints',
  version: '1.0.0',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Welcome message', tags: ['App'] })
  getHello() {
    return this.appService.getHello();
  }

  @Get('/info')
  @ApiOperation({ summary: 'Get application info', tags: ['App'] })
  getInfo() {
    return this.appService.getInfo();
  }
}
