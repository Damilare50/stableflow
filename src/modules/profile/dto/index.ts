import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'walletAddress', required: true })
  walletAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'businessName', required: true })
  businessName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ name: 'email', required: false })
  email: string;
}
