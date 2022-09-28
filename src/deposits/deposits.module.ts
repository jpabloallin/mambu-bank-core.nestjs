import { Module } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { CreateDepositAccountHandler } from './commands/create_deposit_account/create-deposit-account.handler';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DepositTransactionHandler } from './commands/deposit_transaction/deposit-transaction.handler';
import { WithdrawalTransactionHandler } from './commands/withdrawal_transaction/withdrawal-transaction.handler';
import { TransferTransactionHandler } from './commands/transfer_transaction/transfer-transaction.handler';

@Module({
  imports: [ ConfigModule, CommonModule, CqrsModule ],
  controllers: [DepositsController],
  providers: [
    DepositsService,
    CreateDepositAccountHandler,
    DepositTransactionHandler,
    WithdrawalTransactionHandler,
    TransferTransactionHandler,
  ]
})
export class DepositsModule {}
