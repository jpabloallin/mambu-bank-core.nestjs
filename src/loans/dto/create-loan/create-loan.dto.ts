import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { DisbursementDetails } from "./disbursement-details.dto";
import { InterestSettings } from "./interest-settings.dto";
import { ScheduleSettings } from "./schedule-settings.dto";
import { _Informacion_Adicional } from "./_informacion-adicional.dto";

export class CreateLoanDto {

    @IsString()
    accountHolderKey: string;

    @IsString()
    accountHolderType: string;

    @IsNumber()
    loanAmount: number;

    @IsString()
    productTypeKey: string;

    @ValidateNested()
    @Type(() => InterestSettings)
    interestSettings: InterestSettings;

    @ValidateNested()
    @Type(() => ScheduleSettings)
    scheduleSettings: ScheduleSettings;

    @ValidateNested()
    @Type(() => DisbursementDetails)
    disbursementDetails: DisbursementDetails;

    @ValidateNested()
    @Type(() => _Informacion_Adicional)
    _Informacion_Adicional: _Informacion_Adicional;

}
