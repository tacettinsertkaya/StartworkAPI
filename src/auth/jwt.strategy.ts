/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayload } from 'src/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: "thisIsASecretKey",
    });
  }

  async validate(payload: AuthPayload) {
    const { email } = payload;
    const user = this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
