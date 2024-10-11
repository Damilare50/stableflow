import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async fetchProfile(
    @Query('walletAddress') walletAddress: string,
  ): Promise<any> {
    const data = await this.profileService.fetchProfile(walletAddress);

    return {
      statusCode: HttpStatus.OK,
      data,
      mesage: 'profile fetched successfully',
    };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async saveProfile(@Body() dto: CreateProfileDto): Promise<any> {
    const data = await this.profileService.saveProfile(dto);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'profile saved successfully',
    };
  }
}
