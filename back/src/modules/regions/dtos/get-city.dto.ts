import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
export class GetCityDTO {
  @IsString()
  @IsOptional()
  public name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public uf: string[];

  @IsOptional()
  @IsNumber()
  public population: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  public group: number[];
}
