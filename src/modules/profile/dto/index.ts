import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'walletAddress', required: true })
  walletAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'businessName', required: true })
  businessName: string;
}
