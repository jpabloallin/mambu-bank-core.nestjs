import { TransferTransactionDto } from './../../dto/transactions/transfer-transaction.dto';

export class TransferTransactionCommand {

    constructor(
        public readonly transferTransactionDto: TransferTransactionDto,
        public readonly depositAccountId: string,
    ) {}

}