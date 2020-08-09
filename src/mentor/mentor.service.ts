/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MentorEntity } from 'src/entities/mentor.entity';
import { MentorDto } from 'src/models/mentor.model';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(MentorEntity)
    private mentorRepository: Repository<MentorEntity>,
  ) {}

  async getMentor({ userId }) {
    const user = await this.userRepository.findOne({ where: { id: userId } ,relations:['mentor']});
    const mentorId = user.mentor.id;
    const mentor = await this.mentorRepository.findOne({ where: { id:mentorId } });
    return mentor;
  }

  async registerMentor(mentor:MentorDto){
    try {
      const mentorData = await this.mentorRepository.create(mentor);
      await mentorData.save();
    } catch (err) {
      return 'Mentor Bilgileriniz oluşturulamadı?';
      throw new InternalServerErrorException(
        'Mentor Bilgileriniz Güncellenemedi.?',
        err,
      );
    }

    return 'Mentor Bilgileriniz Başarılı Bir Şekilde Güncellendi';
  }
}
