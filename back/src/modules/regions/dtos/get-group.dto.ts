import { IsArray, IsNumber, IsOptional } from "class-validator";

export class GetGroupDTO {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  id: number;
}
