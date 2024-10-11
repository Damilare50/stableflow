import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, type: String })
  walletAddress: string;

  @Prop({ required: true, type: String })
  businessName: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
