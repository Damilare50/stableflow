import {
  Body,
  Controller,
  Get,
  HttpCode,
  Headers,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { User as AuthUser } from '../../decorator/user.decorator';
import { User } from '@privy-io/server-auth';

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
      message: 'profile fetched successfully',
    };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async saveProfile(
    @Body() dto: CreateProfileDto,
    @AuthUser() user: User,
  ): Promise<any> {
    const data = await this.profileService.saveProfile(dto, user);

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'profile saved successfully',
    };
  }
}
