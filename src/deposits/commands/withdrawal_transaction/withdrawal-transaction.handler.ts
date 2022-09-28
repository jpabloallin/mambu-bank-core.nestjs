import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WithdrawalTransactionCommand } from './withdrawal-transaction.command';
import axios, { AxiosInstance } from 'axios';
import { getHeaders } from 'src/common/helpers/headers.helper';
import { WithdrawalTransactionResponseDto } from 'src/deposits/dto/responses/withdrawal-transaction-response.dto';

@CommandHandler(WithdrawalTransactionCommand)
export class WithdrawalTransactionHandler implements ICommandHandler {

  private readonly axios: AxiosInstance = axios;
  
  constructor(
    public readonly configService: ConfigService,

  ) {}
  async execute(command: WithdrawalTransactionCommand): Promise<WithdrawalTransactionResponseDto> {
    const logger = new Logger(WithdrawalTransactionHandler.name);
    const { withdrawalTransactionDto } = command;
    const { depositAccountId } = command;
    const withdrawalTransactionUrl = `${this.configService.get('DEPOSIT_URL')}/${depositAccountId}/withdrawal-transactions`;
    const headers = getHeaders(this.configService);
    const { data } = await this.axios.post<WithdrawalTransactionResponseDto>(
      withdrawalTransactionUrl,
      withdrawalTransactionDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      },
    );
    if(!!data) logger.log(`Withdrawal transaction was successfully done`);
    
    return data;
  }
}
