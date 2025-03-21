import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.module';

export class UpdateTaskDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
