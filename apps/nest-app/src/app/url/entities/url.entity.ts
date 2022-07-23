import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({ isRequired: true, required: true })
  urlId: string;

  @Prop({ isRequired: true, required: true })
  shortUrl: string;

  @Prop({ isRequired: true, unique: true })
  originalUrl: string;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: Date.now() })
  date: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
