import { WithdrawalTransactionDto } from "src/deposits/dto/transactions/withdrawal-transaction.dto";

export class WithdrawalTransactionCommand {
  constructor(
    public readonly withdrawalTransactionDto: WithdrawalTransactionDto,
    public readonly depositAccountId: string,
  ) {}
}
