import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { Project, ProjectsSchema } from './projects/entities/project.entity';
import { Task, TasksSchema } from './tasks/entities/task.entity';
import { CategoriesModule } from './categories/categories.module';
import {
  Category,
  CategorySchema,
} from './categories/entities/category.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/TODO'),
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectsSchema },
      { name: Task.name, schema: TasksSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    ProjectsModule,
    TasksModule,
    CategoriesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
