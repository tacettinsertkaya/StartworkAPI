/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Param, Post, Body, ValidationPipe } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorDto } from 'src/models/mentor.model';

@Controller('mentor')
export class MentorController {
  constructor(private mentorService: MentorService) {}

 @Get("/get-mentor/:userId")
 getMentor(@Param() params){
     return this.mentorService.getMentor(params);
 }

 @Post("/save-mentor")
  registerMentor(@Body(ValidationPipe) mentor:MentorDto){
    return this.mentorService.registerMentor(mentor);
  }
}
