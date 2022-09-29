import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/events/client-created.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientFactory } from './factories/create-client.factory';
import { CreateClientHandler } from './commands/create-client.handler';
import { ClientCreatedHandler } from './events/client-created/client-created.handler';
import { GetClientsHandler } from './queries/get-clients/get-clients.handler';

@Module({
  imports: [ 
    
    ConfigModule, 

    CqrsModule,

    CommonModule,
  
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      }
    ])
  ],
  controllers: [ClientsController],
  providers: [
    ClientFactory,
    CreateClientHandler,
    ClientCreatedHandler,
    GetClientsHandler,
  ]
})
export class ClientsModule {}
