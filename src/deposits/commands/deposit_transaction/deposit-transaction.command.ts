import { DepositTransactionDto } from "src/deposits/dto/transactions/deposit-transaction.dto";

export class DepositTransactionCommand {
  constructor(
    public readonly depositTransactionDto: DepositTransactionDto,
    public readonly depositAccountId: string,
  ) {}
}
