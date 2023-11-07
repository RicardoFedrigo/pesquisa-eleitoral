import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class JobsRunDTO {
  @IsArray()
  @IsString({ each: true })
  names: string[];

  @IsString()
  @IsOptional()
  year: string;

  @IsBoolean()
  asyncRun: boolean = true;
}
