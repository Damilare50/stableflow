import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../../schemas';
import { ProfileCreatedListener } from './listener';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  exports: [ProfileService],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileCreatedListener],
})
export class ProfileModule {}
