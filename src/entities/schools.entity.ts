import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity("schools")
export class SchoolsEntity {

    @PrimaryGeneratedColumn()
    uni_id:number;
    @Column()
    uni_name:string;
    @Column()
    il_id:number;
    @Column()
    status:number;
}