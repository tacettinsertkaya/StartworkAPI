/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { CityEntity } from './city.entity';
import { DepartmentEntity } from './department.entity';
import { UniversityEntity } from './university.entity';

@Entity('profile')
export class ProfileEntity extends AbstractEntity {
  @Column()
  nameSurname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  countryId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  website: string;

  @Column()
  linkedin: string;

  @Column()
  twitter: string;


  @Column()
  experienceId: number;

  @Column()
  companyId: number;

  @Column()
  biography: string;

  @Column('simple-array')
  profileTags: string[];

  @Column()
  skillId: number;

  @Column()
  callingId: number;

  //user
  @OneToOne(
    type => UserEntity,
    user => user.profile,
  )
  user: UserEntity;

  //city
  @OneToOne(
    type => CityEntity,
    city => city.profile,
  )
  @JoinColumn()
  city: CityEntity;

  //department
  @OneToOne(
    type => DepartmentEntity,
    department => department.profile,
  )
  @JoinColumn()
  department: DepartmentEntity;

  // school
  @OneToOne(
    type => UniversityEntity,
    university => university.profile,
  )
  @JoinColumn()
  university: UniversityEntity;


}
