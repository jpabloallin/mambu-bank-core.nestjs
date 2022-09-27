import { Injectable } from '@nestjs/common';
import { CreateDepositAccountDto } from './dto/deposit_account/create-deposit-account.dto';
import { UpdateDepositAccountDto } from './dto/deposit_account/update-deposit-account.dto';

@Injectable()
export class DepositsService {
  create(createDepositAccountDto: CreateDepositAccountDto) {
    return 'This action adds a new deposit';
  }

  findAll() {
    return `This action returns all deposits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deposit`;
  }

  update(id: number, updateDepositAccountDto: UpdateDepositAccountDto) {
    return `This action updates a #${id} deposit`;
  }

  remove(id: number) {
    return `This action removes a #${id} deposit`;
  }
}
