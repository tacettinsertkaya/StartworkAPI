import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InvestorEntity } from 'src/entities/investor.entity';
import { InvestorController } from './investor.controller';
import { InvestorService } from './investor.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([InvestorEntity,UserEntity]),
  ],
  controllers: [InvestorController],
  providers: [InvestorService]
})
export class InvestorModule {}
