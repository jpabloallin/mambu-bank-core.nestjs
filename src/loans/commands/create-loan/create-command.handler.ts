import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { CreateLoanCommand } from './create-loan.command';
import axios, { AxiosInstance } from 'axios';
import { LoanFactory } from 'src/loans/factories/create-loan.factory';
import { Loan } from 'src/loans/entities/loan.entity';
import { getHeaders } from 'src/common/helpers/headers.helper';
import { ResponseLoanDto } from 'src/loans/dto/response.loan.dto';


@CommandHandler(CreateLoanCommand)
export class CreateLoanHandler implements ICommandHandler {

  private readonly axios: AxiosInstance = axios;
  
  constructor(
    public readonly configService: ConfigService,
    private readonly eventPublisher: EventPublisher,
    private readonly loanFactory: LoanFactory,
  ) {}

  async execute(command: CreateLoanCommand): Promise<Loan> {
    const { createLoanDto } = command;
    const headers = getHeaders(this.configService);
    const { data } = await this.axios.post<ResponseLoanDto>(
      this.configService.get('LOAN_URL'),
      createLoanDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      },
    );

    const loan = this.eventPublisher.mergeObjectContext(
      this.loanFactory.create(data),
    );

    loan.commit();

    return loan;
  }
}
