import { Global, Module } from '@nestjs/common';
import { PrivyService } from './privy.service';
import { AuthService } from './auth.service';

@Global()
@Module({
  providers: [PrivyService, AuthService],
  exports: [PrivyService, AuthService],
})
export class GeneralModule {}
