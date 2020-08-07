import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DepartmentEntity } from "src/entities/department.entity";
import { UniversityEntity } from "src/entities/university.entity";
import { CityEntity } from "src/entities/city.entity";

export class ProfileDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'nameSurname' })
    nameSurname:string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"username"})
    username:string;

  
    @ApiProperty({type:CityEntity,description:'city'})
    city:CityEntity;

    @IsNumber()
    @ApiProperty({type:Number,description:'country'})
    countryId:number;



    @IsString()
    @IsEmail()
    @MinLength(4)
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'email' })
    email: string;

    @IsString()
    @ApiProperty({type:String,description:'website'})
    website:string;

    @IsString()
    @ApiProperty({type:String,description:'linkedin'})
    linkedin:string;

    @IsString()
    @ApiProperty({type:String,description:'twitter'})
    twitter:string;

    @ApiProperty({type:DepartmentEntity,description:'department'})
    department:DepartmentEntity;

    @ApiProperty({type:UniversityEntity,description:'school'})
    university:UniversityEntity;

    @IsNumber()
    @ApiProperty({type:Number,description:'experience'})
    experienceId:number;

    
    @IsNumber()
    @ApiProperty({type:Number,description:'company'})
    companyId:number;

     
    @IsString()
    @ApiProperty({type:String,description:'biography'})
    biography:string;

}