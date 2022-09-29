import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateClientCommand } from './commands/create-client.command';
import { CreateClientDto } from './dto/create_client/create-client.dto';
import { ResponseClientDto } from './dto/response/response-client.dto';
import { Client } from './entities/client/client.entity';
import { GetClientsQuery } from './queries/get-clients/get-clients.query';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    ) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {

    return await this.commandBus.execute<CreateClientCommand, Client>(
      new CreateClientCommand(createClientDto),
    );
  }

  @Get()
  async findAll(): Promise<ResponseClientDto[]> {
    return await this.queryBus.execute<GetClientsQuery, ResponseClientDto[]>(
      new GetClientsQuery( ),
    );
  }

}
