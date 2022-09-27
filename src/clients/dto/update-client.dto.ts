import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create_client/create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
