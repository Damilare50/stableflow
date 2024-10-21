import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMailSubscriptionDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'subscriber email',
    name: 'email',
    required: true,
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'subscription type',
    name: 'type',
    required: false,
  })
  type?: 'waitlist' | 'newsletter';
}
