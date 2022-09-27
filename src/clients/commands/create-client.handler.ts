import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import axios, { AxiosInstance } from "axios";
import { getHeaders } from "src/common/helpers/headers.helper";
import { ResponseClientDto } from "../dto/response/response-client.dto";
import { Client } from "../entities/client/client.entity";
import { ClientFactory } from "../factories/create-client.factory";
import { CreateClientCommand } from './create-client.command';

@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler {

    private readonly axios: AxiosInstance = axios;

    constructor(

        public readonly configService: ConfigService,
        private readonly eventPublisher: EventPublisher,
        private readonly clientFactory: ClientFactory,
    ) { }

    async execute(command: CreateClientCommand): Promise<Client> {

        const logger = new Logger(CreateClientHandler.name);
        logger.log('Creating a new client...');

        const { createClientDto } = command;
        const headers = getHeaders(this.configService);

        const { data } = await this.axios.post<ResponseClientDto>(
            this.configService.get('CLIENTS_URL'),
            createClientDto,
            {
                headers,
                baseURL: this.configService.get('BASE_URL'),
            }
        );

        const client = this.eventPublisher.mergeObjectContext(
            this.clientFactory.create( data ),
        );

        client.commit();

        return client;
    }


}