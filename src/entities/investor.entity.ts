/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractEntity } from './abstract.entity';
import { Entity, Column, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('investor')
export class InvestorEntity extends AbstractEntity {

  @Column()
  isInvesment: boolean;

  @Column()
  portfoyId: number;

  @Column()
  isStatus: boolean;

  @Column()
  isSector: boolean;

  @Column()
  destinationSectorId: number;

  @Column()
  isInvestmentStep: boolean;

  @Column('simple-array')
  investmentStepIds: string[];


   //user
   @OneToOne(
    type => UserEntity,
    user => user.profile,
  )
  user: UserEntity;
}
