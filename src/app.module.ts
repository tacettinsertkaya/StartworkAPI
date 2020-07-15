import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeOrmConfig';


@Module({
  imports: [
   
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
