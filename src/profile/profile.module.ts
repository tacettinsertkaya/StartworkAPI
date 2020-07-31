import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { UserEntity } from 'src/entities/user.entity';
import { SchoolsEntity } from 'src/entities/schools.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProfileEntity,UserEntity,SchoolsEntity]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
