
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy} from "./google.strategy"
import { ProfileService } from 'src/profile/profile.service';
import { ProfileEntity } from 'src/entities/profile.entity';
import { SchoolsEntity } from 'src/entities/schools.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,ProfileEntity,SchoolsEntity]),
    JwtModule.register({
      secret:'thisIsASecretKey',
      signOptions: {
        expiresIn: 604800,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,GoogleStrategy,ProfileService],
  exports: [PassportModule,JwtStrategy],
})
export class AuthModule {}
