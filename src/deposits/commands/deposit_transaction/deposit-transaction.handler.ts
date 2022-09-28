import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositTransactionCommand } from './deposit-transaction.command';
import axios, { AxiosInstance } from 'axios';
import { getHeaders } from 'src/common/helpers/headers.helper';
import { DepositTransactionResponseDto } from 'src/deposits/dto/responses/deposit-transaction-response.dto';

@CommandHandler(DepositTransactionCommand)
export class DepositTransactionHandler implements ICommandHandler {

  private readonly axios: AxiosInstance = axios;
  
  constructor(
    public readonly configService: ConfigService,

  ) {}
  async execute(command: DepositTransactionCommand): Promise<DepositTransactionResponseDto> {
    const logger = new Logger(DepositTransactionHandler.name);
    const { depositTransactionDto } = command;
    const { depositAccountId } = command;
    const depositTransactionUrl = `${this.configService.get('DEPOSIT_URL')}/${depositAccountId}/deposit-transactions`;
    const headers = getHeaders(this.configService);
    const { data } = await this.axios.post<DepositTransactionResponseDto>(
      depositTransactionUrl,
      depositTransactionDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      },
    );
    if(!!data) logger.log(`Deposit transaction was successfully sent`);
    
    return data;
  }
}
