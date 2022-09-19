import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ ConfigModule, CommonModule ],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
