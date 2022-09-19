import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LoanAccountStates } from 'src/loans/enums/loan-account-state.enum';

export class ChangeStateDto {
  @IsEnum(LoanAccountStates)
  action: string;

  @IsOptional()
  @IsString()
  notes: string;
}
