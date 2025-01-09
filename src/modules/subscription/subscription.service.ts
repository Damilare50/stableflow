import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from '../../schemas';
import { Model } from 'mongoose';
import { CreateMailSubscriptionDto } from './dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<Subscription>,
  ) {}

  async saveMailSubscription(
    data: CreateMailSubscriptionDto,
  ): Promise<Subscription> {
    const find = await this.subscriptionModel.findOne({
      email: data.email,
      type: data?.type ?? 'waitlist',
    });

    if (find)
      throw new BadRequestException(
        `${data.email} has already been added to ${data?.type ?? 'waitlist'}`,
      );

    const mailSub = await this.subscriptionModel.create(data);

    return mailSub;
  }
}
