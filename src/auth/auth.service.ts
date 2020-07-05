/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService :JwtService
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async register(credentials: RegisterDto) {
    try {
      //   const emailCheck = await this.userRepository.findOne({where : {credentials.email}});
      const user = this.userRepository.create(credentials);
     
      await user.save();
      const payload = {username : user.username};
      const token = this.jwtService.sign(payload);
      return {user : {...user.toJSON(),token}};
    } catch (err) {
    
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Bu  email veya kullanıcı daha önce alınmıştır.');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      console.log("valid : ",isValid);
      if (!isValid) {
        throw new UnauthorizedException('Email Veya Şifreniz Yanlış.!!');
      }
      const payload = {username : user.username};
      console.log("Payload : ",payload)
      const token = this.jwtService.sign(payload);
      console.log("Token : ",token)
      return {...user.toJSON(),token};
    } catch (err) {
      throw new UnauthorizedException('Email Veya Şifreniz Yanlış.!!');
    }
   
  }
}
