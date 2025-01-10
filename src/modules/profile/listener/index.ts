import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../../../enum';
import { Profile } from '../../../schemas';
import { EmailService } from '../../../modules/general/email.service';

@Injectable()
export class ProfileCreatedListener {
  constructor(private emailService: EmailService) {}

  @OnEvent(Events.PROFILE_CREATED)
  async handleEvent(profile: Profile) {
    const email = profile.email;

    if (email) {
      const subject = 'Welcome to Stableflow!';
      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome, ${profile.businessName}!</h2>
          <p>We're excited to have you on board. Here's a quick overview of how to get started:</p>
          <ul>
            <li>Explore your dashboard.</li>
            <li>Set up your profile.</li>
            <li>Start using our amazing features.</li>
          </ul>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Enjoy,</p>
          <p>The Stableflow Team</p>
        </div>
      `;

      await this.emailService.sendMail({
        to: email,
        subject,
        html,
      });
    }
  }
}
