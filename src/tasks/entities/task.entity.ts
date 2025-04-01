import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB').replace(/ /g, '/');

export enum CompleteTask {
  Completed = 'completed',
  Pending = 'pending',
}

@Schema()
export class Task {
  @Prop({ required: true })
  Title: string;

  @Prop({ required: true, enum: CompleteTask, default: CompleteTask.Pending })
  completed: CompleteTask;

  @Prop({ default: formattedDate })
  Date: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectID: Types.ObjectId;
}

export const TasksSchema = SchemaFactory.createForClass(Task);
