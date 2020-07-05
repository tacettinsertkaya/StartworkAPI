import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(2)
  username: string;
}


export interface AuthPayload {
    username: string;
  }
