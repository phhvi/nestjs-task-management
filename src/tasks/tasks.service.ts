import { Injectable, NotFoundException } from '@nestjs/common';
import { v7 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.module';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDTO): Task[] {
    let tasks = this.tasks;
    const { status, search } = filterDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      const searchLowerCase = search.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task?.title?.toLowerCase().includes(searchLowerCase) ||
          task?.description?.toLowerCase().includes(searchLowerCase),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(updateTaskDto: UpdateTaskDTO, id: string): Task {
    const task = this.getTaskById(id);
    task.status = updateTaskDto?.status;
    return task;

    // const taskIndex = this.tasks.findIndex((task) => task.id === id);

    // if (taskIndex === -1) {
    //   throw new NotFoundException(`Task with ID "${id}" not found`);
    // }

    // // Create updated task with new status
    // const updatedTask = {
    //   ...this.tasks[taskIndex],
    //   status: updateTaskDto.status,
    // };

    // // Replace the old task with updated one
    // this.tasks[taskIndex] = updatedTask;

    // return updatedTask;
  }

  // updateTaskRework(updateStatus: TaskStatus, id: string) {
  //   const taskIndex = this.tasks.findIndex((task) => task.id === id);
  //   if (taskIndex === -1) {
  //     throw new NotFoundException('Task with ID provided is not found');
  //   }

  //   const updateTask = {
  //     ...this.tasks[taskIndex],
  //     status: updateStatus,
  //   };
  //   this.tasks[taskIndex] = updateTask;
  //   return updateTask;
  // }
}
