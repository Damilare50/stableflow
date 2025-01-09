import { Injectable } from '@nestjs/common';
import { config } from 'node-config-ts';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = createTransport({
      service: config.MAIL.SERVICE,
      secure: true,
      auth: {
        user: config.MAIL.USER,
        pass: config.MAIL.PASSWORD,
      },
    });
  }

  async sendMail({ to, subject, html }: Mail.Options): Promise<Boolean> {
    try {
      const mailOptions = {
        from: config.MAIL.FROM,
        to,
        subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
