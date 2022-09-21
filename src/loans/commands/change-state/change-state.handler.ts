import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeStateCommand } from './change-state.command';
import axios, { AxiosInstance } from 'axios';
import { ResponseChangeStateDto } from 'src/loans/dto/response-change-state.dto';
import { getHeaders } from 'src/common/helpers/headers.helper';

@CommandHandler(ChangeStateCommand)
export class ChangeStateHandler implements ICommandHandler {

  private readonly axios: AxiosInstance = axios;
  
  constructor(
    public readonly configService: ConfigService,

  ) {}
  async execute(command: ChangeStateCommand): Promise<ResponseChangeStateDto> {
    const logger = new Logger(ChangeStateHandler.name);
    const { changeStateDto } = command;
    const { loanAccountId } = command;
    const changeStateUrl = `${this.configService.get('LOAN_URL')}/${loanAccountId}:changeState`;
    const headers = getHeaders(this.configService);
    const { data } = await this.axios.post<ResponseChangeStateDto>(
      changeStateUrl,
      changeStateDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      },
    );
    if(!!data) logger.log(`Product state changed :: ${data.accountState}`);
    
    return data;
  }
}
