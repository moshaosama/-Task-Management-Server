import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/AuthGuard/AuthGuard.service';

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createProject(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('categoryID') categoryID: string,
  ) {
    return this.projectsService.createProject(title, description, categoryID);
  }

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  DeleteProjectById(@Param('id') id: string) {
    return this.projectsService.deleteProjectByID(id);
  }

  @Get('/:id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }
}
