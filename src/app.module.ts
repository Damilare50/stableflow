import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { config } from 'node-config-ts';
import { ProfileModule } from './profile/profile.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AuthModule } from './auth/auth.module';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI, { dbName: 'stableflow' }),
    EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' }),
    ProfileModule,
    PaymentModule,
    SubscriptionModule,
    AuthModule,
    GeneralModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
