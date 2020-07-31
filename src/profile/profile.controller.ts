/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body,ValidationPipe, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { ProfileDto } from 'src/models/profile.model';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  

  @Post('/saveProfile')
  @ApiCreatedResponse({
    description: 'Profile Registration',
  })
  @ApiBody({ type: ProfileDto })
  register(@Body(ValidationPipe) credentials: ProfileDto) {
    console.log('controller register ---> :',credentials);
    return this.profileService.saveProfile(credentials);
  }

  @Get("/schools")
  getSchools(){
    return this.profileService.getSchools();
  }

  @Get("/cities")
  getCities(){
    return this.profileService.getCities();
  }

  
}
