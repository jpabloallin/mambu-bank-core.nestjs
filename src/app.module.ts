import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { CommonModule } from './common/common.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    ClientsModule,
    
    CommonModule,

    LoansModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
