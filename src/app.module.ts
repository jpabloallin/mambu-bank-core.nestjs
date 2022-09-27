import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { CommonModule } from './common/common.module';
import { LoansModule } from './loans/loans.module';
import { DepositsModule } from './deposits/deposits.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    ClientsModule,
    
    CommonModule,

    LoansModule,

    MongooseModule.forRoot( process.env.MONGODB ),

    DepositsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
