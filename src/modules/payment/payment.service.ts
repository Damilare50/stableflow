import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, Profile } from '../../schemas';
import { CreatePaymentDto } from './dto';
import { Model } from 'mongoose';
import { isMongoId } from 'class-validator';
import { User } from '@privy-io/server-auth';

@Injectable()
export class PaymentService {
  private readonly logger: Logger = new Logger(PaymentService.name);

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
    const payment = await this.paymentModel.findById(id).populate('profile');
    if (!payment) throw new NotFoundException();

    return payment;
  }

  async listTransactions(user: User): Promise<Payment[]> {
    this.logger.debug(user);
    if (!user) throw new UnauthorizedException('invalid userId');

    const walletAddress = user.wallet.address;

    const profile = await this.profileModel.findOne({ walletAddress }).exec();

    if (!profile) throw new UnauthorizedException('invalid user');

    const transactions: Payment[] = await this.paymentModel
      .find({ profile: profile._id })
      .exec();

    return transactions;
  }
}
