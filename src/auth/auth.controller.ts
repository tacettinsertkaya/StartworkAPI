/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/models/user.model';
import {  ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  @ApiCreatedResponse({
    description:"User Registration"
  })
  @ApiBody({type:RegisterDto})
  register(@Body(ValidationPipe) credentials: RegisterDto) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @ApiOkResponse({description:"User Login"})
  @ApiUnauthorizedResponse({description:"Invalid credentials"})
  @ApiBody({type:LoginDto})
  login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  
 //google ile giris yapma
 @Get("/google")
 @UseGuards(AuthGuard('google'))
 async googleAuth(@Req() req) {}

 @Get('/google/redirect')
 @UseGuards(AuthGuard('google'))
 googleAuthRedirect(@Req() req) {
   return this.authService.googleLogin(req);
 }
}
