import { Injectable, Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client } from "src/clients/entities/events/client-created.entity";
import { ClientCreatedEvent } from "./client-created.event";

@Injectable()
@EventsHandler( ClientCreatedEvent )
export class ClientCreatedHandler implements IEventHandler<ClientCreatedEvent> {
    
    constructor(
        @InjectModel( Client.name )
        private readonly clientCreatedModel: Model<Client>
    ) {}
    
    async handle(event: ClientCreatedEvent) {
        
        const logger = new Logger(ClientCreatedHandler.name);
        logger.log(
            `Client: ${event.clientName} ${event.clientLastName} :: Id: ${event.clientId} created`,
        );
        
        await this.clientCreatedModel.create( event as Client,)
    }

}