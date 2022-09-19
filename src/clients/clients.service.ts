import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { getHeaders } from '../common/helpers/headers.helper';
import { ResponseClientDto } from './dto/response-client.dto';

@Injectable()
export class ClientsService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    private readonly configService: ConfigService,
    
  ) {}

  async create(createClientDto: CreateClientDto) {

    const headers = getHeaders(this.configService);

    const {data}  = await this.axios.post<ResponseClientDto>( 
      this.configService.get('CLIENTS_URL'), 
      createClientDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      }
    );
    return data;
  }

  async findAll() {

    const headers = getHeaders(this.configService);
    const {data} = await this.axios.get<ResponseClientDto[]>(
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

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
