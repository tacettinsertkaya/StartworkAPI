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
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  ForgetPasswordDto,
} from 'src/models/user.model';
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
import { ResetPasswordDto } from 'src/common/dto/reset-password.dto';
import { strict } from 'assert';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'User Registration',
  })
  @ApiBody({ type: RegisterDto })
  register(@Body(ValidationPipe) credentials: RegisterDto) {
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
      if (isEmailVerified) {
        const link = 'http://localhost:8080/home#/login';
        return `<a href="${link}"> Giriş yapmak için tıklayınız</a>`;
      }
      return 'Login Error';
    } catch (error) {
      //  return new ResponseError('LOGIN.ERROR', error);
    }
  }

  // şifremi unuttum
  @Post('/forgotten-password')
  async forgetPassword(@Body(new ValidationPipe()) email: ForgetPasswordDto) {
    return await this.authService.sendEmailForgotPassword(email);
  }

  @Post('/forgot-password/:token')
  public async resetForgotPassword(
    @Body() newPassword: ResetPasswordDto,
    @Param() params,
  ) {
    const user = await this.authService.verifyToken(params.token, newPassword);
    if (!user) {
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return 'Şifreniz başarılı bir şekilde değiştirildi.!! ';
  }

  //şifremi değiştir
  @Post('/change-password')
  public async changePassword(@Body() changePassword: ResetPasswordDto) {
    try {
      let isNewPasswordChanged = false;
      if (changePassword.email && changePassword.currentPassword) {
        const isValidPassword = await this.authService.checkPassword(
          changePassword.email,
          changePassword.currentPassword,
        );

        if (isValidPassword) {
          isNewPasswordChanged = await this.authService.changePassword(
            changePassword.email,
            changePassword.newPassword
          );
        } else {
          return new ResponseError('CHANGE PASSWORD WRONG CURRENT PASSWORD');
        }
      }

      return new ResponseSuccess(
        'RESET PASSWORD PASSWORD CHANGED',
        isNewPasswordChanged,
      );
    } catch (error) {}
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
