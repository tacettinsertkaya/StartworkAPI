/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { ProfileEntity } from "./profile.entity";


@Entity("city")
export class CityEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    status:number;

    @OneToOne(
        type => ProfileEntity,
        profile => profile.city,
      ) 
      profile:ProfileEntity
      
      
}