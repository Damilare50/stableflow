import { Injectable } from '@nestjs/common';
import { EmailService } from '../../../modules/general/email.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../../../enum';
import { config } from 'node-config-ts';

@Injectable()
export class CreatePaymentListener {
  constructor(private emailService: EmailService) {}

  @OnEvent(Events.PAYMENT_CREATED)
  async handleEvent(payment: any) {
    const { profile } = payment;
    const { businessName, email } = profile;

    const paymentLink = `${config.FE_BASE_URL}/pay/${payment.profile.businessName}?paymentid=${payment._id}`;
  }
}
