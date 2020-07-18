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
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ResetPasswordDto, AuthPayload } from 'src/models/user.model';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from 'src/common/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'User Registration',
  })
  @ApiBody({ type: RegisterDto })
  register(@Body(ValidationPipe) credentials: RegisterDto) {
    console.log("controller register ---> ");
    return this.authService.register(credentials);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Get('/email/verify/:token')
  public async verifyEmail(@Param() params): Promise<string> {
    try {
      
      const isEmailVerified = await this.authService.verifyEmail(params.token);
      if(isEmailVerified){
        const link ="http://localhost:8080/home#/login"
        return `<a href="${link}"> Giriş yapmak için tıklayınız</a>`;
      }
      return "Login Error";
    
    } catch (error) {
     //  return new ResponseError('LOGIN.ERROR', error);
    }
  }

  // şifremi unuttum 


  @Post('/forgottenPassword')
  async forgetPassword(
    @Body(new ValidationPipe()) email:ResetPasswordDto,
  ){
    return await this.authService.sendEmailForgotPassword(email);
  }

   
  @Post("/reset/:token")
  public async checkToken(@Param() params){
    return await this.authService.verifyToken(params);
  }

  @Get("/forgot-password/:user")
   public async resetForgotPassword(@Param()params){
     return await this.authService.changePassword(params.user);
   }

  @Get("/forgot-password1/:password")
  public async resetForgotPassword1(@Param() params): Promise<IResponse> {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(
        params.email,
      );
      if (isEmailSent) {
        return new ResponseSuccess("LOGIN.EMAIL_RESENT", null);
      } else {
        return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
      }
    } catch (error) {
      return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
    }
  }



  //google ile giris yapma
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
