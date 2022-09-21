import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { LoanCreatedEvent } from './loan-created.event';

@EventsHandler(LoanCreatedEvent)
export class LoanCreatedHandler implements IEventHandler {
    handle(event: LoanCreatedEvent) {
    const logger = new Logger(LoanCreatedHandler.name);
        logger.log(`${event.productName} :: Total amount: ${event.loanAmount} :: Client: ${event.clientKey}`);
    }
}