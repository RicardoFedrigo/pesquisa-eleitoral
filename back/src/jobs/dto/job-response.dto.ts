import { IsString } from "class-validator";

export class JobsResponseDTO {
  @IsString()
  message: string;
}
