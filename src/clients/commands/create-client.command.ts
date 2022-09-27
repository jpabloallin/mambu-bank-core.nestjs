import { CreateClientDto } from '../dto/create_client/create-client.dto';

export class CreateClientCommand {
    constructor( public readonly createClientDto: CreateClientDto ) {}
}