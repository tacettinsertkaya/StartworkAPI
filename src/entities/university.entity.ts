/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { ProfileEntity } from "./profile.entity";


@Entity("university")
export class UniversityEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    city_id:number;
    @Column()
    status:number;

    @OneToOne(
        type => ProfileEntity,
        profile => profile.city,
      ) 
      profile:ProfileEntity
}