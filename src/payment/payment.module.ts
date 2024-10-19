import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema, Profile, ProfileSchema } from '../schemas';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
})
export class PaymentModule {}
