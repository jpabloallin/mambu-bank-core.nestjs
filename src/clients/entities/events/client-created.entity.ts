import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'clients' })

export class Client extends Document {
  @Prop({
    unique: true,
  })
  clientId: string;

  @Prop()
  clientName: string;

  @Prop()
  clientLastName: string;

}

export const ClientSchema = SchemaFactory.createForClass(Client);