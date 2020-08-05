/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';

@Entity('profiles')
export class ProfileEntity extends AbstractEntity {
  @Column()
  nameSurname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ unique: true })
  email: string;

  @Column()
  website: string;

  @Column()
  linkedin: string;

  @Column()
  twitter: string;

  @Column()
  department: string;

  @Column()
  school: string;

  @Column()
  experience: string;

  @Column()
  company: string;

  @Column()
  biography: string;

  @Column('simple-array')
  profileTags: string[];

  @Column()
  skill: string;

  @Column()
  calling: string;

  @OneToOne(
    type => UserEntity,
    user => user.profile,
  ) 
 user:UserEntity




}
