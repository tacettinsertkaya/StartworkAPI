import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
   
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProfileModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
