/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/models/user.model';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  register(@Body(ValidationPipe) credentials: RegisterDto) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
