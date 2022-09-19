import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ ConfigModule, CommonModule ],
  controllers: [LoansController],
  providers: [LoansService]
})
export class LoansModule {}
