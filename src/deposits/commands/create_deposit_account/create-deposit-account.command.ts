import { CreateDepositAccountDto } from "../../dto/deposit_account/create-deposit-account.dto";

export class CreateDepositAccountCommand {

    constructor(
        public readonly createDepositAccountDto: CreateDepositAccountDto
    ) {}
}