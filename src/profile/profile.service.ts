/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileDto } from 'src/models/profile.model';
import { SchoolsEntity } from 'src/entities/schools.entity';
import { CitiesEntity } from 'src/entities/cities.entity';
import { DepartmentsEntity } from 'src/entities/departments.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(SchoolsEntity)
    private getSchoolsRepository: Repository<SchoolsEntity>,

    @InjectRepository(CitiesEntity)
    private getCitiesRepository: Repository<CitiesEntity>,

    @InjectRepository(DepartmentsEntity)
    private getDepartmentsRespository : Repository<DepartmentsEntity>


  ) {}

  async getProfile() {
    const users = await this.userRepository.find({ relations: ["profile"] });
     console.log("Users profiles  --->:",users);
     return users;
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


  async getSchools(): Promise<SchoolsEntity[]> {
    const schools = await this.getSchoolsRepository.find();
    return schools;
  }

  async getCities() : Promise<CitiesEntity[]>{
    const cities = await this.getCitiesRepository.find();
    return cities;
  }

  async getDepartments() :Promise<DepartmentsEntity[]>{
    const departments = await this.getDepartmentsRespository.find();
    return departments;
  }

}
