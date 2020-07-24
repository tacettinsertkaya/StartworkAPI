import { Entity, Column } from "typeorm";
import { AbstractEntity } from "./abstract.entity";


@Entity('profiles')
export class ProfileEntity extends AbstractEntity{

    @Column()
    nameSurname:string;

    @Column({ unique: true })
    username:string;

    @Column()
    city:string;

    @Column()
    country:string;

    @Column({unique:true})
    email:string;

    @Column()
    website:string;

    @Column()
    linkedin:string;

    @Column()
    twitter:string;

    @Column()
    department:string;

    @Column()
    school:string;

    @Column()
    experience:string;

    @Column()
    company:string;

    @Column()
    biography:string;
}