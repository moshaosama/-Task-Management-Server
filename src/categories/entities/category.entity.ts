import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Category {
  @Prop({ required: true })
  Title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
