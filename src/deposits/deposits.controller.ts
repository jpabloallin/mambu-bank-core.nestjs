import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDepositAccountCommand } from './commands/create_deposit_account/create-deposit-account.command';
import { DepositTransactionCommand } from './commands/deposit_transaction/deposit-transaction.command';
import { WithdrawalTransactionCommand } from './commands/withdrawal_transaction/withdrawal-transaction.command';
import { DepositsService } from './deposits.service';
import { CreateDepositAccountDto } from './dto/deposit_account/create-deposit-account.dto';
import { UpdateDepositAccountDto } from './dto/deposit_account/update-deposit-account.dto';
import { DepositAccountResponseDto } from './dto/responses/deposit-account-response.dto';
import { DepositTransactionResponseDto } from './dto/responses/deposit-transaction-response.dto';
import { WithdrawalTransactionResponseDto } from './dto/responses/withdrawal-transaction-response.dto';
import { DepositTransactionDto } from './dto/transactions/deposit-transaction.dto';
import { WithdrawalTransactionDto } from './dto/transactions/withdrawal-transaction.dto';

@Controller('deposits')
export class DepositsController {
  constructor(
    private readonly depositsService: DepositsService,
    private readonly commandBus: CommandBus,
    ) {}

  @Post()
  async create(@Body() createDepositAccountDto: CreateDepositAccountDto) {
    return await this.commandBus.execute<CreateDepositAccountCommand, DepositAccountResponseDto>(
      new CreateDepositAccountCommand( createDepositAccountDto)
    )
  }

  @Post()
  createDepositAccount(@Body() createDepositDto: CreateDepositAccountDto) {
    return this.depositsService.create(createDepositDto);
  }

  @Post('deposit-transactions/:depositAccountId')
  async depositTransaction(@Body() depositTransactionDto: DepositTransactionDto, @Param('depositAccountId') depositAccountId: string,) {
    return await this.commandBus.execute<DepositTransactionCommand, DepositTransactionResponseDto>(
      new DepositTransactionCommand(depositTransactionDto, depositAccountId ),
    );
  }

  @Post('withdrawal-transactions/:depositAccountId')
  async withdrawalTransaction(@Body() withdrawalTransactionDto: WithdrawalTransactionDto, @Param('depositAccountId') depositAccountId: string,) {
    return await this.commandBus.execute<WithdrawalTransactionCommand, WithdrawalTransactionResponseDto>(
      new WithdrawalTransactionCommand(withdrawalTransactionDto, depositAccountId ),
    );
  }

  @Get()
  findAll() {
    return this.depositsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositAccountDto) {
    return this.depositsService.update(+id, updateDepositDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositsService.remove(+id);
  }
}
