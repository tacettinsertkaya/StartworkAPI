import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("departments")
export class DepartmentsEntity {

    @PrimaryGeneratedColumn()
    bolum_id:number;
    @Column()
    uni_id:number;

    @Column()
    bolum_ad:string;

    @Column()
    fakulte_id:number;
    @Column()
    status:number;
}