/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/models/user.model';
import {  ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from "@nestjs/swagger";

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
}
