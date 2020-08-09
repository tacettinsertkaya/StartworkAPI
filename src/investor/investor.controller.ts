/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { InvestorDto } from 'src/models/investor.model';

@Controller('investor')
export class InvestorController {
    constructor(private investorService: InvestorService) {}

    @Get("/get-investor/:userId")
    getInvestor(@Param() params){
        return this.investorService.getInvestor(params);
    }
   
    @Post("/save-investor")
     registerInvestor(@Body(ValidationPipe) investor:InvestorDto){
       return this.investorService.registerInvestor(investor);
     }
}
