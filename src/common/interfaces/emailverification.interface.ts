import { UserEntity } from "src/entities/user.entity";


export interface EmailVerification extends Document  {
    email: string;
    emailToken: string;
    resetPasswordToken:string;
    timestamp: Date;
  }
  