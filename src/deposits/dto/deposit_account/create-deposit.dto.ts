import { IsString } from "class-validator"

export class CreateDepositDto {

    @IsString()
    accountHolderKey:  string;

    @IsString()
    accountHolderType: string;

    @IsString()
    name:              string;

    @IsString()
    productTypeKey:    string;

    @IsString()
    accountState:      string;

    @IsString()
    notes:             string;

    @IsString()
    accountType:       string;

    @IsString()
    currencyCode:      string;
}
