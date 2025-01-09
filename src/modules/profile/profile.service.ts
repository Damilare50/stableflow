import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../../schemas';
import { CreateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async #findProfile(walletAddress: string) {
    return await this.profileModel.findOne({ walletAddress }).exec();
  }

  async #createProfile(data: Partial<Profile>) {
    return await this.profileModel.create(data);
  }

  async fetchProfile(walletAddress: string): Promise<Profile> {
    const profile = await this.#findProfile(walletAddress);
    if (!profile) throw new NotFoundException('profile not found');

    return profile;
  }

  async saveProfile(data: CreateProfileDto): Promise<Profile> {
    const profile = await this.#findProfile(data.walletAddress);
    if (profile)
      throw new BadRequestException(
        `profile already exist for ${data.walletAddress}`,
      );

    const _profile = await this.#createProfile(data);
    return _profile;
  }
}
