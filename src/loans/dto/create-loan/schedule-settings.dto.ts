import { IsNumber, IsString } from "class-validator";

export class ScheduleSettings {

    @IsNumber()
    gracePeriod: number

    @IsNumber()
    repaymentInstallments: number

    @IsNumber()
    repaymentPeriodCount: number

    @IsString()
    repaymentPeriodUnit: string

    @IsString()
    repaymentScheduleMethod: string

    @IsString()
    scheduleDueDatesMethod: string

}
