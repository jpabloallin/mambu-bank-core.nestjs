import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { getHeaders } from 'src/common/helpers/headers.helper';
import { ChangeStateDto } from './dto/change-state/change-state.dto';
import { CreateLoanDto } from './dto/create-loan/create-loan.dto';
import { ResponseChangeStateDto } from './dto/response-change-state.dto';
import { ResponseLoanDto } from './dto/response.loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    private readonly configService: ConfigService,
    
  ) {}
  
  async create(createLoanDto: CreateLoanDto) {

    const headers = getHeaders(this.configService);

    const {data}  = await this.axios.post<ResponseLoanDto>( 
      this.configService.get('LOAN_URL'), 
      createLoanDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      }
    );
    return data;
  }

  async changeState( loanAccountId: string, changeStateDto: ChangeStateDto ) {

    const headers = getHeaders(this.configService);
    const changeStateUrl = `${this.configService.get('LOAN_URL')}/${loanAccountId}:changeState`;
    const {data}  = await this.axios.post<ResponseChangeStateDto>( 
      changeStateUrl, 
      changeStateDto,
      {
        headers,
        baseURL: this.configService.get('BASE_URL'),
      }
    );

    if(!!data) console.log(`Product state changed :: ${data.accountState}`);

    return data;
  }

  findAll() {
    return `This action returns all loans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
