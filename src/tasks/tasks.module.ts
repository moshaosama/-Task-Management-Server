import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksSchema } from './entities/task.entity';
import { ProjectsSchema } from 'src/projects/entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TasksSchema },
      { name: 'Project', schema: ProjectsSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
