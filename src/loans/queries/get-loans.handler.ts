import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import axios, { AxiosInstance } from 'axios';
import { getHeaders } from 'src/common/helpers/headers.helper';
import { ResponseLoanDto } from '../dto/response.loan.dto';
import { GetLoansQuery } from "./get-loans.query";


@QueryHandler( GetLoansQuery )
export class GetLoansHandler implements IQueryHandler<GetLoansQuery> {

    private readonly axios: AxiosInstance = axios;

    constructor(
        private readonly configService: ConfigService,
    ) { }

    async execute(): Promise<ResponseLoanDto[]> {

        const logger = new Logger(GetLoansHandler.name);
        logger.log('Getting loans...');
        
        const headers = getHeaders(this.configService);
        const { data } = await this.axios.get<ResponseLoanDto[]>(
            this.configService.get('LOAN_URL'),
            {
                headers,
                baseURL: this.configService.get('BASE_URL'),
            }
        );
        return data;
    }
}