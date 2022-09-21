import { CreateLoanDto } from "src/loans/dto/create-loan/create-loan.dto";

export class CreateLoanCommand {
    constructor(
        public readonly createLoanDto: CreateLoanDto
    ){}
}