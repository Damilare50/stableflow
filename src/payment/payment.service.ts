import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, Profile } from '../schemas';
import { CreatePaymentDto } from './dto';
import { Model } from 'mongoose';
import { isMongoId } from 'class-validator';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createPayment(data: CreatePaymentDto): Promise<Payment> {
    const { profileId } = data;
    const profile = await this.profileModel.findById(profileId);
    if (!profile) throw new BadRequestException('Unable to find profile');

    const payment: Payment = await this.paymentModel.create({
      ...data,
      profile,
    });

    return payment;
  }

  async fetchPayment(id: string): Promise<Payment> {
    const validateID = isMongoId(id);
    if (!validateID) throw new BadRequestException('invalid ID passed!');

    const payment = await this.paymentModel.findById(id);
    if (!payment) throw new NotFoundException();

    return payment;
  }
}
