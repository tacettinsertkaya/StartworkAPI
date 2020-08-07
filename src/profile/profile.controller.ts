/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body,ValidationPipe, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { ProfileDto } from 'src/models/profile.model';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  

  @Post('/save-profile')
  @ApiCreatedResponse({
    description: 'Profile Registration',
  })
  @ApiBody({ type: ProfileDto })
  registerProfile(@Body(ValidationPipe) credentials: ProfileDto) {
    console.log('controller register ---> :',credentials);
    return this.profileService.saveProfile(credentials);
  }

  @Get("/get-profile")
  getProfile(){
    return this.profileService.getProfile();
  }

  @Get("/schools")
  getSchools(){
    return this.profileService.getSchools();
  }

  @Get("/cities")
  getCities(){
    return this.profileService.getCities();
  }

  @Get("/departments")
  getDepartments(){
    return this.profileService.getDepartments();
  }
}
