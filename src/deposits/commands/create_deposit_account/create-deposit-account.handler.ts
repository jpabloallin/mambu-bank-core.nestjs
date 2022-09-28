import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import axios, { AxiosInstance } from 'axios';
import { getHeaders } from 'src/common/helpers/headers.helper';
import { DepositAccountResponseDto } from '../../dto/responses/deposit-account-response.dto';
import { CreateDepositAccountCommand } from './create-deposit-account.command';

@CommandHandler(CreateDepositAccountCommand)
export class CreateDepositAccountHandler implements ICommandHandler {
  private readonly axios: AxiosInstance = axios;

  constructor(public readonly configService: ConfigService) {}

  async execute(command: CreateDepositAccountCommand): Promise<any> {
    const logger = new Logger(CreateDepositAccountHandler.name);
    const { createDepositAccountDto } = command;
    const headers = getHeaders(this.configService);
    const { data } = await this.axios.post<DepositAccountResponseDto>(
      this.configService.get('DEPOSIT_URL'),
      createDepositAccountDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      },
    );

    if(!!data) logger.log(`Deposit account with id :: ${data.id} was created`);

    return data;
  }
}
