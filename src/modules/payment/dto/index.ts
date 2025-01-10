import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ name: 'profileId', required: true })
  profileId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'customerName', required: true })
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ name: 'customerEmail', required: true })
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'paymentNetwork', required: true })
  paymentNetwork: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'currency', required: true })
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'amountInUsdc', required: true })
  amountInUsdc: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'amountInNGN', required: true })
  amountInNGN: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'description', required: true })
  description: string;
}

export class MongoIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ name: 'id', required: true })
  id: string;
}
