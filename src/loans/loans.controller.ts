import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ChangeStateDto } from './dto/change-state/change-state.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLoanCommand } from './commands/create-loan/create-loan.command';
import { Loan } from './entities/loan.entity';
import { ChangeStateCommand } from './commands/change-state/change-state.command';
import { ResponseChangeStateDto } from './dto/response-change-state.dto';
import { ResponseLoanDto } from './dto/response.loan.dto';
import { GetLoansQuery } from './queries/get-loans.query';

@Controller('loans')
export class LoansController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    ) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto) {
    return await this.commandBus.execute<CreateLoanCommand, Loan>(
      new CreateLoanCommand(createLoanDto),
    );
  }

  @Post('changeState/:loanAccountId')
  async change(@Body() changeStateDto: ChangeStateDto, @Param('loanAccountId') loanAccountId: string,) {
    return await this.commandBus.execute<ChangeStateCommand, ResponseChangeStateDto>(
      new ChangeStateCommand(changeStateDto, loanAccountId),
    );
    //this.loansService.changeState(loanAccountId, changeStateDto);
  }
  @Get()
  async findAll(): Promise<ResponseLoanDto[]> {
    return await this.queryBus.execute<GetLoansQuery, ResponseLoanDto[]>(
      new GetLoansQuery(),
    );
  }

}
