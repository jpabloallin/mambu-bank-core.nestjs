import { IsString } from "class-validator";

export class DisbursementDetails {

  @IsString()
  expectedDisbursementDate: string;

  @IsString()
  firstRepaymentDate: string;

}