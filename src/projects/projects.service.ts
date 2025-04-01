import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async createProject(
    title: string,
    description: string,
    categoryID: string,
  ): Promise<Project> {
    try {
      if (!categoryID) {
        throw new Error('Please Enter a categoryID');
      }
      const newProject = new this.projectModel({
        title,
        description,
        categoryID,
      });

      await newProject.save();

      await this.categoryModel.findByIdAndUpdate(
        categoryID,
        { $push: { projects: newProject._id } },
        { new: true },
      );

      return newProject;
    } catch (err) {
      return err;
    }
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('categoryID');
  }

  async deleteProjectByID(id: string): Promise<string> {
    await this.projectModel.deleteOne({ _id: id });
    return 'Deleted Successfully!!';
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }
}
