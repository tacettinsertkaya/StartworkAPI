/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileDto } from 'src/models/profile.model';
import { UniversityEntity } from '../entities/university.entity';
import { CityEntity } from 'src/entities/city.entity';
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
    private getDepartmentRespository : Repository<DepartmentEntity>


  ) {}

  async getProfile() {
    const email ="abrahamsungur@gmail.com";
     const profile = await this.profileRepository.findOne({ where:{email},relations:['city','department','university']});
     return profile;
  }

  async saveProfile(credentails: ProfileDto): Promise<ProfileEntity> {
    const profile = await this.profileRepository.create(credentails);
    await profile.save();
    return profile;
  }


  async updateProfile(credentails: ProfileDto): Promise<ProfileEntity> {
    const profile = await this.profileRepository.create(credentails);
    return profile;
  }


  async getSchools(): Promise<UniversityEntity[]> {
    const schools = await this.getUniversityRepository.find();
    return schools;
  }

  async getCities() : Promise<CityEntity[]>{
    const cities = await this.getCityRepository.find();
    return cities;
  }

  async getDepartments() :Promise<DepartmentEntity[]>{
    const departments = await this.getDepartmentRespository.find();
    return departments;
  }

}
