import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../../schemas';
import { CreateProfileDto } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthService } from '../general/auth.service';
import { User } from '@privy-io/server-auth';
import { Events } from '../../enum';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private eventEmitter: EventEmitter2,
    private authService: AuthService,
  ) {}

  async #findProfile(walletAddress: string) {
    return await this.profileModel.findOne({ walletAddress }).exec();
  }

  async #createProfile(data: Partial<Profile>) {
    const profile = await this.profileModel.create(data);

    await this.eventEmitter.emitAsync(Events.PROFILE_CREATED, profile);
    return profile;
  }

  async fetchProfile(walletAddress: string): Promise<Profile> {
    const profile = await this.#findProfile(walletAddress);
    if (!profile) throw new NotFoundException('profile not found');

    return profile;
  }

  async saveProfile(data: CreateProfileDto, user: User): Promise<Profile> {
    const profile = await this.#findProfile(data.walletAddress);
    if (profile)
      throw new BadRequestException(
        `profile already exist for ${data.walletAddress}`,
      );

    if (!user) throw new NotFoundException('user not found');

    const _profile = await this.#createProfile({
      ...data,
      email: user.email.address,
    });
    return _profile;
  }
}
