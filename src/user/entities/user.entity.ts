import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  Photo: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
