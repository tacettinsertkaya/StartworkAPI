/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileDto } from 'src/models/profile.model';
import { UniversityEntity } from '../entities/university.entity';
import { CityEntity } from 'src/entities/cities.entity';
import { DepartmentEntity } from 'src/entities/department.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(UniversityEntity)
    private getUniversityRepository: Repository<UniversityEntity>,

    @InjectRepository(CityEntity)
    private getCityRepository: Repository<CityEntity>,

    @InjectRepository(DepartmentEntity)
    private getDepartmentRespository: Repository<DepartmentEntity>,
  ) {}

  async getProfile({ userId }) {
    const getProfile = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    const profileId = getProfile.profile.id;
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['city', 'department', 'university'],
    });
    return profile;
  }

  async saveProfile(credentails: ProfileDto) {
    try {
      const profile = await this.profileRepository.create(credentails);
      await profile.save();
    } catch (err) {
      return 'Profil Bilgileri oluşturulamadı?';
      throw new InternalServerErrorException(
        'Profil Bilgileriniz Güncellenemedi.?',
        err,
      );
    }

    return 'Profile Bilgileriniz Başarılı Bir Şekilde Güncellendi';
  }

  async updateProfile(credentails: ProfileDto): Promise<ProfileEntity> {
    const profile = await this.profileRepository.create(credentails);
    return profile;
  }

  async getUniversities(): Promise<UniversityEntity[]> {
    const universities = await this.getUniversityRepository.find();
    return universities;
  }

  async getCities(): Promise<CityEntity[]> {
    const cities = await this.getCityRepository.find();
    return cities;
  }

  async getDepartments(): Promise<DepartmentEntity[]> {
    const departments = await this.getDepartmentRespository.find();
    return departments;
  }
}
