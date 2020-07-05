/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AbstractEntity } from "./abstract.entity";
import { Entity, Column, BeforeInsert } from "typeorm";
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from "bcryptjs";


@Entity("user")
export class UserEntity extends AbstractEntity{

    @Column({unique:true})
    email :string;

    @Column({unique :true})
    username:string;

    @Column()
    @Exclude()
    password:string;


    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10);
    }

   
    toJSON(){
        return classToPlain(this);
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
      }
    
}