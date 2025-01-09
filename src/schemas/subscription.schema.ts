import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({
    required: true,
    type: String,
    default: 'waitlist',
    enum: ['waitlist', 'newsletter'],
  })
  type: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
