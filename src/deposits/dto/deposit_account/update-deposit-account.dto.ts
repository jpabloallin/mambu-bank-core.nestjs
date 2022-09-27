import { PartialType } from '@nestjs/mapped-types';
import { CreateDepositAccountDto } from './create-deposit-account.dto';

export class UpdateDepositAccountDto extends PartialType(CreateDepositAccountDto) {}
