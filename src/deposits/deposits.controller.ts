import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDepositAccountCommand } from './commands/create-deposit-account.command';
import { DepositsService } from './deposits.service';
import { CreateDepositAccountDto } from './dto/deposit_account/create-deposit-account.dto';
import { UpdateDepositAccountDto } from './dto/deposit_account/update-deposit-account.dto';
import { DepositAccountResponseDto } from './dto/responses/deposit-account-response.dto';

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
