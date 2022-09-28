import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import axios, { AxiosInstance } from "axios";
import { getHeaders } from "src/common/helpers/headers.helper";
import { TransferTransactionResponseDto } from "src/deposits/dto/responses/transfer-transaction-response.dto";
import { TransferTransactionCommand } from "./transfer-transaction.command";


@CommandHandler(TransferTransactionCommand)
export class TransferTransactionHandler implements ICommandHandler {

  private readonly axios: AxiosInstance = axios;
  
  constructor(
    public readonly configService: ConfigService,

  ) {}
  async execute(command: TransferTransactionCommand): Promise<TransferTransactionResponseDto> {
    const logger = new Logger(TransferTransactionHandler.name);
    const { transferTransactionDto } = command;
    const { depositAccountId } = command;
    const transferTransactionUrl = `${this.configService.get('DEPOSIT_URL')}/${depositAccountId}/transfer-transactions`;
    const headers = getHeaders(this.configService);
    const { data } = await this.axios.post<TransferTransactionResponseDto>(
      transferTransactionUrl,
      transferTransactionDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      },
    );
    if(!!data) logger.log(`Transfer transaction was successfully done`);
    
    return data;
  }
}