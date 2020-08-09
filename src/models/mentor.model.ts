import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class MentorDto{

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, description: 'isInvesment' })
    isInvesment:boolean;


    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"portfoyId"})
    portfoyId:number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, description: 'isStatus' })
    isStatus:boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, description: 'isSector' })
    isSector:boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,description:"destinationSectorId"})
    destinationSectorId:number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ type: Boolean, description: 'isInvestmentStep' })
    isInvestmentStep:boolean;
  


}