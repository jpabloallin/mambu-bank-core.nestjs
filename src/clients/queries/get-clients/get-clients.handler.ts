import { ConfigService } from "@nestjs/config";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import axios, { AxiosInstance } from "axios";
import { ResponseClientDto } from "src/clients/dto/response-client.dto";
import { getHeaders } from "src/common/helpers/headers.helper";
import { GetClientsQuery } from "./get-clients.query";


@QueryHandler(GetClientsQuery)
export class GetClientsHandler implements IQueryHandler<GetClientsQuery> {

    private readonly axios: AxiosInstance = axios;

    constructor(
        private readonly configService: ConfigService,
    ) { }

    async execute(): Promise<ResponseClientDto[]> {
        
        const headers = getHeaders(this.configService);
        const { data } = await this.axios.get<ResponseClientDto[]>(
            this.configService.get('CLIENTS_URL'),
            {
                headers,
                baseURL: this.configService.get('BASE_URL'),
                params: {
                    'limit': this.configService.get('LIMIT'),
                    'offset': this.configService.get('OFFSET'),
                },
            }
        );
        return data;
    }
}