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
    const { profile, customerEmail, customerName, amountInUsdc } = payment;
    const { businessName } = profile;

    const paymentLink = `${config.FE_BASE_URL}/pay/${payment.profile.businessName}?paymentid=${payment._id}`;
    const subject = `${businessName} has sent you a payment request`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h4>Hello, ${customerName}!</h4>
        <p>${businessName} has sent you a payment request.</p>
        <p><strong>Amount:</strong> ${amountInUsdc} USDC</p>
        <p>To complete the payment, please click the link below:</p>
        <p>
          <a href="${paymentLink}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Pay Now
          </a>
        </p>
        <p>If the button doesn't work, you can also copy and paste the link into your browser:</p>
        <p><a href="${paymentLink}">${paymentLink}</a></p>
        <p>If you have any questions, please contact ${businessName}.</p>
        <p>Thank you for your prompt response!</p>
        <p>Best regards,</p>
        <p>${businessName}</p>
      </div>
    `;

    await this.emailService.sendMail({
      to: customerEmail,
      subject,
      html,
    });
  }
}
