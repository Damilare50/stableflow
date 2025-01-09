import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { config } from 'node-config-ts';
import { PaymentModule } from './modules/payment/payment.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { GeneralModule } from './modules/general/general.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI, { dbName: 'stableflow' }),
    EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' }),
    ProfileModule,
    PaymentModule,
    SubscriptionModule,
    GeneralModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
