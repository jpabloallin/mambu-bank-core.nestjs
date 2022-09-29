import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { LoanCreatedHandler } from './events/loan-created/loan-created.handler';
import { LoanCreatedEvent } from './events/loan-created/loan-created.event';
import { ChangeStateHandler } from './commands/change-state/change-state.handler';
import { LoanFactory } from './factories/create-loan.factory';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLoanHandler } from './commands/create-loan/create-command.handler';
import { GetLoansHandler } from './queries/get-loans.handler';

@Module({
  imports: [ ConfigModule, CommonModule, CqrsModule ],
  controllers: [LoansController],
  providers: [
    CreateLoanHandler,
    LoanCreatedHandler,
    LoanCreatedEvent,
    ChangeStateHandler,
    LoanFactory,
    GetLoansHandler
  ]
})
export class LoansModule {}
