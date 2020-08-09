import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorEntity } from 'src/entities/mentor.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MentorEntity,UserEntity]),
  ],
  providers: [MentorService],
  controllers: [MentorController]
})
export class MentorModule {}
