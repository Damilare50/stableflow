import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'node-config-ts';

@Module({
  imports: [MongooseModule.forRoot(config.MONGO_URI, { dbName: 'stableflow' })],
  controllers: [AppController],
})
export class AppModule {}
