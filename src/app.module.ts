import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'node-config-ts';
import { ProfileModule } from './profile/profile.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI, { dbName: 'stableflow' }),
    ProfileModule,
    PaymentModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
