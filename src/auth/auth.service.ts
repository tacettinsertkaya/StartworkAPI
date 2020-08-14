/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  LoginDto,
  RegisterDto,
  ForgetPasswordDto,
  ResetPasswordDto,
} from 'src/models/user.model';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { resetPasswordSendEmail } from '../utils/resetPasswordSendEmail';
import { resetEmailLink } from '../utils/resetEmailLink';
import { sendEmail } from 'src/utils/sendEmail';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import * as nodemailer from 'nodemailer';
import { EmailVerification } from 'src/common/interfaces/emailverification.interface';
import { ForgottenPassword } from 'src/common/interfaces/forgottenpassword.interface';
import { ProfileService } from 'src/profile/profile.service';
import { strict } from 'assert';
import { ProfileEntity } from 'src/entities/profile.entity';
import * as bcrypt from 'bcryptjs';
import { UniversityEntity } from 'src/entities/university.entity';
import { CityEntity } from 'src/entities/cities.entity';
import { DepartmentEntity } from 'src/entities/department.entity';
import { MentorEntity } from 'src/entities/mentor.entity';
import { InvestorEntity } from 'src/entities/investor.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private emailVerification: Repository<EmailVerification>,
    @InjectRepository(UserEntity)
    private forgottenPassword: Repository<ForgottenPassword>,

    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,

    @InjectRepository(MentorEntity)
    private mentorRepository: Repository<MentorEntity>,
    @InjectRepository(InvestorEntity)
    private investorRepository: Repository<InvestorEntity>,
  ) {}

  async register(credentials: RegisterDto) {
    try {
      // profile bilgileri
      const profile = new ProfileEntity();
      profile.email = credentials.email;
      profile.nameSurname = credentials.name + ' ' + credentials.surname;
      profile.createdAt = new Date();
      profile.updatedAt = new Date();
      profile.username = credentials.email;
      profile.website = '';
      profile.linkedin = '';
      profile.companyId = 0;
      profile.twitter = '';
      profile.experienceId = 0;
      profile.callingId = 0;
      profile.skillId = 0;
      profile.biography = '';
      profile.profileTags = [];
      this.profileRepository.create(profile);
      await profile.save();

      // mentor bilgileri
      const mentor = new MentorEntity();
      (mentor.isInvesment = false),
        (mentor.portfoyId = 0),
        (mentor.isStatus = false),
        (mentor.isSector = false),
        (mentor.destinationSectorId = 0),
        (mentor.isInvestmentStep = false),
        (mentor.investmentStepIds = []),
        (mentor.createdAt = new Date()),
        (mentor.updatedAt = new Date());
      this.mentorRepository.create(mentor);
      await mentor.save();

      // investor bilgileri
      const investor = new InvestorEntity();
      (investor.isInvesment = false),
        (investor.portfoyId = 0),
        (investor.isStatus = false),
        (investor.isSector = false),
        (investor.destinationSectorId = 0),
        (investor.isInvestmentStep = false),
        (investor.investmentStepIds = []),
        (investor.createdAt = new Date()),
        (investor.updatedAt = new Date());
      this.investorRepository.create(investor);
      await investor.save();

      let user = new UserEntity();
      user = this.userRepository.create(credentials);
      user.createdAt = new Date();
      user.profile = profile;
      user.mentor = mentor;
      user.investor = investor;

      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      user.emailToken = token;
      user.verifyEmail = false;
      user.newPasswordToken = '';

      console.log('User --->:', user);
      await user.save();
      await this.sendEmailVerification(user.email);
      return 'Hesabınız başarılı bir şekilde  oluşturuldu. Size gönderilen   e-postadan hesabınızı aktifleştiriniz!';
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return ' Hesabınız  oluşturalamadı. Çünkü bu  e-postayla daha önce hesap  açılmıştır.';
        throw new ConflictException('Bu  e-posta  daha önce kullanılmıştır.');
      }
      return 'Kullanıcı kayıdı oluşturulmadı.';
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto) {
    //  try {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return 'Email veya şifreniz Yanlış.!';
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (user.verifyEmail === false) {
      try {
        throw new HttpException(
          'LOGIN.EMAIL_NOT_VERIFIED',
          HttpStatus.FORBIDDEN,
        );
      } catch (error) {
        return 'Size  gönderilen e-postadan hesabınızı aktifleştiriniz!';
        throw new HttpException(
          'Size  gönderilen e-postadan hesabınızı aktifleştiriniz!',
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const isValid = await user.comparePassword(password);
    console.log('valid : ', isValid);
    if (!isValid) {
      return 'Email veya şifreniz Yanlış.!';
      throw new UnauthorizedException('Email veya şifreniz Yanlış.!');
    }
    const payload = { email: user.email };
    console.log('Payload : ', payload);
    const token = this.jwtService.sign(payload);

    console.log('Token : ', token);
    return { ...user.toJSON(), token };
    /*
    } catch (err) {
      throw new UnauthorizedException('Email Veya Şifreniz Yanlış.!!');
    }
    */
  }

  async forgetPassword({ email }: ForgetPasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Böyle Bir email bulunulmadı!');
    }
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);
    /// const forgotLink = `http://localhost:4000/api/auth/forgotPassword?token=${token}`;
    const forgotLink = `http://http://localhost:8080/home#/reset-password`;
    await resetPasswordSendEmail(user, forgotLink);
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async verifyEmail(token:string): Promise<boolean> {
    console.log("Gelen token ------->:",token);
    const emailVerif = await this.emailVerification.findOne({
      where: { emailToken:token},
    });

    console.log("verifyEmail ---------->:",emailVerif);

    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.userRepository.findOne({
        where: { email: emailVerif.email },
      });

      if (userFromDb) {
        userFromDb.verifyEmail = true;
        const savedUser = await userFromDb.save();
        // await emailVerif.remove();
        return !!savedUser;
      }
    } else {
      throw new HttpException(
        'LOGIN.EMAIL_CODE_NOT_VALID',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async sendEmailVerification(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    const payload = { email: user.email };
  

    if (user) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'startworkapi@gmail.com',
          pass: 'startworkapi.34',
        },
      });

      const link = 'http://localhost:8080/confirm/' + user.emailToken;


      const mailOptions = {
        from: 'startworkapi@email.com', // sender address
        to: user.email, // list of receivers
        subject: 'Mail Doğrulama', // Subject line
        html: `<b></b> <a href="${link}"> Hesabınızı aktif etmek için tıklayınız ? </a>`, // html body
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log('Error ---> : ', err);
        else console.log('Info ---> :', info);
      });

      return true;
    } else {
      throw new HttpException(
        'REGISTER.USER_NOT_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async sendEmailForgotPassword({ email }: ForgetPasswordDto) {
    // const mail ="abrahamsungur@gmail.com";
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user)
      throw new HttpException('LOGIN USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);
    user.newPasswordToken = token;
    await user.save();
    if (user) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'startworkapi@gmail.com',
          pass: 'startworkapi.34',
        },
      });

      const link = 'http://localhost:8080/home#/reset-password';
      const mailOptions = {
        from: 'startworkapi@email.com', // sender address
        to: user.email, // list of receivers
        subject: 'Subject of your email', // Subject line
        //html: `<b>Şifrenizi sıfırlamak etmek için tıklayınız ?</b> <a href="${link}">http://localhost:4000/api/users/checkToken/' + token</a>`, // html body
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' +
          'localhost:8080/home#' +
          '/reset-password/' +
          token +
          '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log('Error ---> : ', err);
        else console.log('Info ---> :', info);
      });

      return 'Size şifre sıfırlama e-postası gönderildi.  Lütfen e-postanızı kontrol ediniz!';
    } else {
      throw new HttpException(
        'REGISTER.USER_NOT_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async createResetForgottenPassword(
    user: UserEntity,
    resetPasswordToken: string,
  ) {
    await user.save();
  }

  async verifyToken(newPasswordToken: ResetPasswordDto, newPassword: string) {
    console.log('Verify Token newPassword -------> :', newPassword);
    const user = await this.userRepository.findOne({
      where: { newPasswordToken },
    });
    if (!user) {
      return 'Bu kullanıcı bulunulmadı ?';
    }

    return this.setPassword(user.email, newPassword);
  }

  async setPassword(email: string, newPassword: string): Promise<string> {
    const userFromDb = await this.userRepository.findOne({ email });
    if (!userFromDb) {
      return 'Kullanıcı bulunulmadı.!';
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    userFromDb.password = await bcrypt.hash(newPassword, 10);
    await userFromDb.save();
    return 'Şifreniz başarılı bir şekilde değiştirildi';
  }

  async checkPassword(email: string, password: string) {
    const userFromDb = await this.userRepository.findOne({ email });
    if (!userFromDb)
      throw new HttpException('LOGIN USER NOT FOUND', HttpStatus.NOT_FOUND);

    return await bcrypt.compare(password, userFromDb.password);
  }

  async changePassword(email: string, newPassword: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user)
      throw new HttpException('LOGIN USER NOT FOUND', HttpStatus.NOT_FOUND);

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    return true;
  }

  async getForgottenPasswordModel(
    newPasswordToken: string,
  ): Promise<ForgottenPassword> {
    return await this.forgottenPassword.findOne({
      where: { newPasswordToken },
    });
  }
}
