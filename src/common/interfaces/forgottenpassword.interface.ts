export interface ForgottenPassword extends Document {
    email:string;
    resetPasswordToken: string;
    timestamp: Date;
  }
  