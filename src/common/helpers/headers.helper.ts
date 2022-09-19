import { v4 as uuid } from "uuid";
import { ConfigService } from "@nestjs/config";

export const getHeaders = (configService: ConfigService) => {
    return {
      apikey: configService.get('APIKEY'),
      Accept: 'application/vnd.mambu.v2+json',
      'Content-Type': 'application/json',
      'Idempotency-Key': uuid(),
    };
  };