import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop({ required: true, unique: true })
  gameId: string;

  @Prop({ required: true })
  gameName: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
