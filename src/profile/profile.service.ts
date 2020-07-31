import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileDto } from 'src/models/profile.model';
import { SchoolsEntity } from 'src/entities/schools.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(SchoolsEntity)
    private getSchoolsRepository: Repository<SchoolsEntity>,
  ) {}

  async getLoginProfile(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    const profile = new ProfileEntity();
    profile.nameSurname = user.name + ' ' + user.surname;
    profile.createdAt = user.createdAt;
    profile.email = user.email;

    console.log('login profile ----> : ', profile);
    return user;
  }

  async saveProfile(credentails: ProfileDto): Promise<ProfileEntity> {
    const profile = await this.profileRepository.create(credentails);
    return profile;
  }

  async getSchools(): Promise<SchoolsEntity[]> {
    const schools = await this.getSchoolsRepository.find();
    return schools;
  }
}
