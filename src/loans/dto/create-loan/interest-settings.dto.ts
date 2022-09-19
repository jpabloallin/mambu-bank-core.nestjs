import { IsNumber } from "class-validator";

export class InterestSettings {

    @IsNumber()
    interestRate: number
}