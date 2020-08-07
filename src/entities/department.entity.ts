/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity("department")
export class DepartmentEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    uni_id:number;

    @Column()
     name:string;

    @Column()
    fakulte_id:number;
    @Column()
    status:number;

    @OneToOne(
        type => ProfileEntity,
        profile => profile.city,
      ) 
      profile:ProfileEntity
}