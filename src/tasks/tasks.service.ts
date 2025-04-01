import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompleteTask, Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createTask(Title: string, projectID: string): Promise<Task> {
    try {
      const newTask = new this.taskModel({ Title, projectID });
      await newTask.save();

      await this.projectModel.findByIdAndUpdate(projectID, {
        $push: { tasks: newTask._id },
      });

      return newTask;
    } catch (err) {
      return err;
    }
  }

  async getTasks(projectID: string): Promise<Task[]> {
    try {
      const Tasks = await this.taskModel.find({ projectID });
      if (!Tasks) {
        throw new NotFoundException(`Project with ID ${projectID} not found`);
      }
      return Tasks;
    } catch (err) {
      return err;
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const Tasks = await this.taskModel.find();
      return Tasks;
    } catch (err) {
      return err;
    }
  }

  async UpdateCompleteinTasks(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.completed === CompleteTask.Pending) {
      task.completed = CompleteTask.Completed;
    } else if (task.completed === CompleteTask.Completed) {
      task.completed = CompleteTask.Pending;
    }
    await task.save();
    return task;
  }
}
