import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, PopulatedDoc, Types } from 'mongoose';
import { Profile } from './profile.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true, type: String })
  customerName: string;

  @Prop({ required: true, type: String })
  paymentNetwork: string;

  @Prop({ required: true, type: String })
  currency: string;

  @Prop({ required: true, type: Number })
  amountInUsdc: number;

  @Prop({ required: true, type: Number })
  amountInNGN: number;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({
    required: true,
    type: String,
    default: 'pending',
    enum: ['pending', 'completed'],
  })
  status: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Profile' })
  profile: PopulatedDoc<Profile>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
