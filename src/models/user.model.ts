import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @IsNotEmpty()
  @ApiProperty({type:String ,description:"email"})
  email: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @ApiProperty({type:String ,description:"password"})
  password: string;
}

export class RegisterDto extends LoginDto {

  @IsString()
  @MinLength(2)
  @ApiProperty({type:String ,description:"username"})
  username: string;
}


export interface AuthPayload {
    username: string;
  }
