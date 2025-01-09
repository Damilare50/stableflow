import { Global, Module } from '@nestjs/common';
import { PrivyService } from './privy.service';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
@Global()
@Module({
  providers: [PrivyService, AuthService, EmailService],
  exports: [PrivyService, AuthService, EmailService],
})
export class GeneralModule {}
