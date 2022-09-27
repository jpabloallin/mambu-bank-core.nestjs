import { Module } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { CreateDepositAccountHandler } from './commands/create-deposit-account-command.handler';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [ ConfigModule, CommonModule, CqrsModule ],
  controllers: [DepositsController],
  providers: [
    DepositsService,
    CreateDepositAccountHandler,
  
  ]
})
export class DepositsModule {}
