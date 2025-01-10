import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema, Profile, ProfileSchema } from '../../schemas';
import { CreatePaymentListener } from './listener';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, CreatePaymentListener],
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
