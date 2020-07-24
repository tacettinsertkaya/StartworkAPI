import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'nameSurname' })
    nameSurname:string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:"username"})
    username:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:'city'})
    city:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type:String,description:'country'})
    country:string;



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

    @IsString()
    @ApiProperty({type:String,description:'departmen'})
    department:string;

    @IsString()
    @ApiProperty({type:String,description:'school'})
    school:string;

    @IsString()
    @ApiProperty({type:String,description:'experience'})
    experience:string;

    
    @IsString()
    @ApiProperty({type:String,description:'company'})
    company:string;

     
    @IsString()
    @ApiProperty({type:String,description:'biography'})
    biography:string;

}