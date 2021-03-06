/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AbstractEntity } from './abstract.entity';
import { Entity, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { ProfileEntity } from './profile.entity';
import { MentorEntity } from './mentor.entity';
import { InvestorEntity } from './investor.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  verifyEmail: boolean;

  @Column()
  emailToken: string;

  @Column()
  newPasswordToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToOne(
    type => ProfileEntity,
    profile => profile.user,
  )
  @JoinColumn()
  profile: ProfileEntity;

  @OneToOne(
    type => MentorEntity,
    mentor => mentor.user,
  )
  @JoinColumn()
  mentor: MentorEntity;

  @OneToOne(
    type => InvestorEntity,
    investor => investor.user,
  )
  @JoinColumn()
  investor: InvestorEntity;

  toJSON() {
    return classToPlain(this);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
