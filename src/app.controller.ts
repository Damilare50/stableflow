import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';

@Controller()
@ApiTags('')
export class AppController {
  @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return 'Hello stableflow!';
  }
}
