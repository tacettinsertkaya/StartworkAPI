import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import { ProfileModule } from './profile/profile.module';
import { MentorModule } from './mentor/mentor.module';
import { InvestorModule } from './investor/investor.module';


@Module({
  imports: [
   
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProfileModule,
    MentorModule,
    InvestorModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
