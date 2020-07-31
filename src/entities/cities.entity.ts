import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity("city")
export class CitiesEntity {

    @PrimaryGeneratedColumn()
    il_id:number;
    @Column()
    il_name:string;
    @Column()
    status:number;
}