import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  
}
