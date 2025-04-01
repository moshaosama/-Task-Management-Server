import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/AuthGuard/AuthGuard.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  createTask(
    @Body('Title') Title: string,
    @Body('projectID') projectID: string,
  ) {
    return this.tasksService.createTask(Title, projectID);
  }

  @Get('/:projectid')
  getTasks(@Param('projectid') projectID: string) {
    return this.tasksService.getTasks(projectID);
  }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Put('/update_task')
  @UseGuards(AuthGuard)
  updateCompleteTask(@Body('id') id: string) {
    return this.tasksService.UpdateCompleteinTasks(id);
  }
}
