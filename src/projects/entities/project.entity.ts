import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true }) // تخزين كـ ObjectId
  categoryID: Types.ObjectId;
}

export const ProjectsSchema = SchemaFactory.createForClass(Project);
