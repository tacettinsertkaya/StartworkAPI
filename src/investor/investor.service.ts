/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InvestorEntity } from 'src/entities/investor.entity';
import { Repository } from 'typeorm';
import { InvestorDto } from 'src/models/investor.model';

@Injectable()
export class InvestorService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    
        @InjectRepository(InvestorEntity)
        private investorRepository: Repository<InvestorEntity>,
      ) {}
    
      async getInvestor({ userId }) {
        const user = await this.userRepository.findOne({ where: { id: userId } ,relations:['investor']});
        const investorId = user.investor.id;
        const investor = await this.investorRepository.findOne({ where: { id:investorId } });
        return investor;
      }
    
      async registerInvestor(investor:InvestorDto){
        try {
          const investorData = await this.investorRepository.create(investor);
          await investorData.save();
        } catch (err) {
          return 'Investor Bilgileriniz oluşturulamadı?';
          throw new InternalServerErrorException(
            'Investor Bilgileriniz Güncellenemedi.?',
            err,
          );
        }
    
        return 'Investor Bilgileriniz Başarılı Bir Şekilde Güncellendi';
      }
}
