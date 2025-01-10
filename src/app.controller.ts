import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello stableflow!';
  }
}
