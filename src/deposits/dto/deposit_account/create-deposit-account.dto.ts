import { IsEnum, IsString } from "class-validator"
import { DepositAccountStates } from "src/deposits/enums/deposit-account-state.enum";

export class CreateDepositAccountDto {

    @IsString()
    accountHolderKey:  string;

    @IsString()
    accountHolderType: string;

    @IsString()
    name:              string;

    @IsString()
    productTypeKey:    string;

    @IsEnum(DepositAccountStates)
    accountState:      string;

    @IsString()
    notes:             string;

    @IsString()
    accountType:       string;

    @IsString()
    currencyCode:      string;
}
