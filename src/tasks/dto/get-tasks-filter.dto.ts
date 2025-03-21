import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.module';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  search?: string;
}
