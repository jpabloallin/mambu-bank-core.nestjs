import { ChangeStateDto } from "src/loans/dto/change-state/change-state.dto";

export class ChangeStateCommand {
  constructor(
    public readonly changeStateDto: ChangeStateDto,
    public readonly loanAccountId: string,
  ) {}
}
