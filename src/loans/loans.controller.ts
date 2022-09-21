import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ChangeStateDto } from './dto/change-state/change-state.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateLoanCommand } from './commands/create-loan/create-loan.command';
import { Loan } from './entities/loan.entity';
import { ChangeStateCommand } from './commands/change-state/change-state.command';
import { ResponseChangeStateDto } from './dto/response-change-state.dto';

@Controller('loans')
export class LoansController {
  constructor(
    private readonly loansService: LoansService,
    private readonly commandBus: CommandBus
    ) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto) {
    return await this.commandBus.execute<CreateLoanCommand, Loan>(
      new CreateLoanCommand(createLoanDto),
    );
    //this.loansService.create(createLoanDto);
  }

  @Post('changeState/:loanAccountId')
  async change(@Body() changeStateDto: ChangeStateDto, @Param('loanAccountId') loanAccountId: string,) {
    return await this.commandBus.execute<ChangeStateCommand, ResponseChangeStateDto>(
      new ChangeStateCommand(changeStateDto, loanAccountId),
    );
    //this.loansService.changeState(loanAccountId, changeStateDto);
  }
  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
