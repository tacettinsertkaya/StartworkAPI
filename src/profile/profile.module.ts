import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UniversityEntity } from 'src/entities/university.entity';
import { CityEntity } from 'src/entities/cities.entity';
import { DepartmentEntity } from 'src/entities/department.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProfileEntity,UserEntity,UniversityEntity,CityEntity,DepartmentEntity]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
